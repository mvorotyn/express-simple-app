import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsPhoneNumber, MinLength, MaxLength, Length, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
// @Length(1, 10)
export class CreateUserDto {
  @IsString()
  @Length(2, 60)
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNotEmpty()
  public photo: string;

  @IsPhoneNumber('UA')
  public phone: string;

  @IsNumber()
  @Min(1)
  @Max(4)
  @Transform(params => {
    return parseInt(params.value);
  })
  public position_id: number;
}
