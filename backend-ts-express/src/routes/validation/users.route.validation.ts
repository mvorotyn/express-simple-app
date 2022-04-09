import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class UsersParams {
  @IsNumber()
  @Min(1)
  @Transform(params => {
    return parseInt(params.value);
  })
  count: number;

  @IsNumber()
  @Min(1)
  @Transform(params => {
    return parseInt(params.value);
  })
  private page: number;

  @IsNumber()
  @Min(0)
  @Transform(params => {
    return parseInt(params.value);
  })
  offset: number;
}
