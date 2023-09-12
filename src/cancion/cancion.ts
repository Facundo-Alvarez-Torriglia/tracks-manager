export class Cancion {
  setInterprete(interprete: any) {
    throw new Error('Method not implemented.');
  }
  protected id: number;
  protected titulo: string;
  protected duracion: number;
  protected interprete: string;

  constructor() {
    this.id = 0;
    this.titulo = ' ';
    this.duracion = 0;
    this.interprete = ' ';
  }

  public getID(): number {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDuracion(): number {
    return this.duracion;
  }

  public getInterprete(): string {
    return this.interprete;
  }

  public setID(id): void {
    this.id /*id de clase*/ = id; /*q le pase por parametro*/
  }

  public setTitulo(titulo): void {
    this.titulo = titulo;
  }
  
  public setDuracion(duracion): void {
    this.duracion = duracion;
  }
  
  public setTiInterprete(interprete): void {
    this.interprete = interprete;
  }
}
