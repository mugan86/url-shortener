import { IsString, IsNotEmpty } from 'class-validator';

export class ShortenURLDto {
  @IsString()
  @IsNotEmpty()
  longUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}