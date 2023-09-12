import { Controller, Get } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Tracks } from './tracks.interface';
import { Cancion } from 'src/cancion/cancion';

@Controller('tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  getTracks(): Promise<Tracks[]> {
    return this.trackService.getTrakcs();
  }
}
