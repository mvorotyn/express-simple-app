import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { stream2buffer } from '@/utils/files';
import jpeg from 'jpeg-js';
import shortid from 'shortid';
import { optimizeAndSaveImage } from '@/tasks';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
  imagesToValidate: Array<{ imagename: string; type: string; minWidth: number; minHeight: number; maxFileSize: number }> = [],
): RequestHandler => {
  return async (req, res, next) => {
    const fails = {};
    const imageTasks = [];
    let imageValidationFailed = false;

    const folderPath = 'users/images/';

    for (let index = 0; index < imagesToValidate.length; index++) {
      const fileID = shortid.generate();
      const filename = `${fileID}.image.jpg`;

      const image = imagesToValidate[index];
      req.body[image.imagename] = 'empty_image_str';
      if (!req.files[image.imagename]) {
        fails[image.imagename] = [
          `No file "${image.imagename}".Image must be ${image.type} with width and height: ${image.minWidth}px and ${image.minHeight}px or greater.`,
        ];
        imageValidationFailed = true;
      } else {
        const buffer = await stream2buffer(req.files[image.imagename]);
        try {
          const img = jpeg.decode(buffer);
          if (img.width < image.minWidth || img.height < image.minHeight) {
            fails[image.imagename] = [`Image must be  ${image.type} with width and height: ${image.minWidth}px and ${image.minHeight}px or greater.`];
            imageValidationFailed = true;
          } else {
            if (buffer.byteLength > image.maxFileSize * 1000000) {
              fails[image.imagename] = [`Image file size must not exceed ${image.maxFileSize}`];
              imageValidationFailed = true;
            } else {
              imageTasks.push({ imageBuffer: buffer, filename: filename });
              req.body[image.imagename] = folderPath + filename; //valid unproccessed image
            }
          }
        } catch (error) {
          // console.log(error);
          if (error.message === 'SOI not found') {
            imageValidationFailed = true;
            fails[image.imagename] = ['image is invalid jpg'];
          }
        }
      }
    }

    console.log(imagesToValidate);
    validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0 || imageValidationFailed) {
        // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        const message = 'Validation Failed';

        errors.forEach(error => {
          fails[error.property] = Object.values(error.constraints);
        });
        // next(new HttpException(400, message));
        res.status(422).send({ success: false, message, fails: fails });
      } else {
        imageTasks.forEach(task => {
          optimizeAndSaveImage(task.imageBuffer, task.filename).then(result => {
            console.log('optimize and save task result: ', result);
          });
        });
        next();
      }
    });
  };
};

export default validationMiddleware;
