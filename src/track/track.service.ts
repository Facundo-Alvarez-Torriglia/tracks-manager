import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
const BASE_URL = 'http://localhost:3030/tracks/';
import { Track } from './track.interface';
@Injectable()
export class TrackService {

  //Metodo Get
  async getTracks(): Promise<Track[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new BadRequestException();
    const parsed = res.json();
    return parsed;
  }

  //Metodos Get por artist
  async getTracksByArtist(artist: string): Promise<Track[]> {
    const allTracks = await this.getTracks();
    const filteredByArtist = allTracks.filter((tr: Track) =>
      tr.artist.toLocaleLowerCase().includes(artist.toLocaleLowerCase()),
    );
    if (!filteredByArtist.length) throw new NotFoundException();
    return filteredByArtist;
  }

  //Metodos Get por title
  async getTracksByTitle(title: string): Promise<Track[]> {
    const allTracks = await this.getTracks();
    const filteredByTitle = allTracks.filter((track: Track) =>
      track.title.toLowerCase().includes(title.toLowerCase())
    );
    if (!filteredByTitle.length) {
      throw new NotFoundException();
    }
    return filteredByTitle;
  }

  //Metodos Get por duracion
async getTracksByDuration(duration: number): Promise<Track[]> {
  const allTracks = await this.getTracks();
  const filteredByDuration = allTracks.filter((track: Track) =>
    track.duration === duration
  );
  if (!filteredByDuration.length) {
    throw new NotFoundException();
  }
  return filteredByDuration;
}

  //Metodos Get por id
  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    //track existe: lo retornamos al controller
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`Track  con id ${id} no existe`);
  }

  //Metodos POST
  async createTrack(track: Track): Promise<Track> {
    const id = await this.setId();
    const { title, duration, artist } = track;
    const newTrack = { id, title, duration, artist };
    
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrack),
    });
  
    if (!res.ok) {
      throw new BadRequestException();
    }
  
    const parsed = await res.json();
    return parsed;
  }

   //Metodos DELETE
  async deleteTrackById(id: number) {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new BadRequestException();
    }
    const parsed = await res.json();
    return parsed;
  }

  //Metodos PUT
  async updateTrackById(id: number, body: Track): Promise<void> {
    try {
      const isTrack = await this.getTrackById(id);
  
      if (!Object.keys(isTrack).length) {
        throw new Error(`Track with id ${id} not found`);
      }
  
      const updatedTrack = {
        title: body.title,
        duration: body.duration,
        artist: body.artist,
      };
  
      const res = await fetch(BASE_URL + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTrack),
      });
  
      if (!res.ok) {
        throw new Error('Failed to update track');
      }
    } catch (error) {
      // Aquí puedes manejar el error, por ejemplo, registrándolo o relanzándolo si es necesario.
      console.error(error);
      throw error; // Propagar la excepción para que quien llame a este método pueda manejarla si es necesario.
    }
  }

  private async setId(): Promise<number> {
    const tracks = await this.getTracks();
    const id = tracks.pop().id + 1;
    return id;
  }
}
