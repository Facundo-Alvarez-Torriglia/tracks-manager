import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Track } from './track.interface';
import { TrackService } from './track.service';
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  
  //Metodo GET
  @Get()
  async getTracks(
    @Query('artist') artist?: string, // http://localhost:3000/tracks?title=Bestias
    @Query('title') title?: string,  //http://localhost:3000/tracks?artist=Morgan
    @Query('duration') duration?: number, // no me funciono http://localhost:3000/tracks?duracion=160
  ): Promise<Track[]> {
    if (artist) {
      // Si se proporciona el filtro artist, busca por artista sin repetir
      return this.trackService.getTracksByArtist(artist);
    } else if (title) {
      // Si se proporciona el filtro title, busca por título
      return this.trackService.getTracksByTitle(title);
    } else if (duration) {
      // Si se proporciona el filtro duration, busca por duración
      return this.trackService.getTracksByDuration(duration);
    } else {
      // Si no se proporciona ningún filtro, obtén todas las pistas
      return this.trackService.getTracks();
    }
  }
  
  //Metodo GET BY ID
  @Get('/:id')
  async getTrackById(@Res() res, @Param('id') id: number): Promise<any> {
    if (!isNaN (Number(id))) { //si es ???? 
      const responseFromService = await this.trackService.getTrackById(id); 
      return res.json(responseFromService);
    } else {
      return res 
      .status(HttpStatus.NOT_ACCEPTABLE)
      .JSON({message: 'No voy a ir al servicio con ID invalido'});
    }
  }

  //Metodo POST
  @Post()
  createTrack(@Body() body): Promise<any> {
    return this.trackService.createTrack(body);
  }

  //Metodo DELETE
  @Delete('/:id')
  deleteTrackById(@Param('id') id: number): Promise<void> {
    return this.trackService.deleteTrackById(id);
  }

  //Metodo PUT
  @Put('/:id')
  updateTrackById(@Param('id') id: number, @Body() body): Promise<void> {
    return this.trackService.updateTrackById(id, body);
  }
}
