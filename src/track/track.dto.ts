import { IsString, IsNumber } from 'class-validator';
export class TrackDto  {
    @IsString()
    title: string;
    @IsNumber()
    duration: number;
    @IsString()
    artist: string;
  } 