import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, API_PREFIX } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import formData from 'express-form-data';
import serveStatic from 'serve-static';
import os from 'os';
import path from 'path';
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.set('json spaces', 2);
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors()); //{ origin: ORIGIN, credentials: CREDENTIALS }//disabled
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    console.log('folder for static files: ', path.join(__dirname, '../public'));
    this.app.use(`/${API_PREFIX}`, serveStatic(path.join(__dirname, '../public'), { fallthrough: true }));
    this.app.get(/.*jpg$/, function (req, res) {
      // handle image not found
      res.redirect(`/${API_PREFIX}users/images/test.jpg`);
    });

    // parse data with connect-multiparty.
    this.app.use(formData.parse(options));
    // delete from the request all empty files (size == 0)
    this.app.use(formData.format());
    // change the file objects to fs.ReadStream
    this.app.use(formData.stream());
    // union the body and the files
    // this.app.use(formData.union());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(`/${API_PREFIX}`, route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
