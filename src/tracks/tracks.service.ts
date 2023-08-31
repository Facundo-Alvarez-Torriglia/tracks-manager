import { Injectable } from '@nestjs/common';
import { Tracks } from './tracks.interface';
import { Cancion } from 'src/cancion/cancion';
const BASE_URL = 'http://localhost:3030/tracks';

@Injectable()
export class TracksService {
  async getTrakcs(): Promise<Tracks[]> {
    const arrayCanciones: Cancion[] = [];
    const respuesta = await fetch(BASE_URL);
    const respuestaParseada = await respuesta.json();

    for (let i = 0; i < respuestaParseada.length; i++) {
      const canciones = new Cancion();
      canciones.setID(respuestaParseada[i].id);
      canciones.setTitulo(respuestaParseada[i].titulo);
      canciones.setDuracion(respuestaParseada[i].duracion);
      canciones.setInterprete(respuestaParseada[i].interprete);
      console.log(canciones);

      arrayCanciones.push(canciones);
    }
    console.log(arrayCanciones);
    return arrayCanciones;
  }
}
