import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  getHome(@Res() res): void {
    const homeHtmlPath = join(__dirname, '..', 'client', 'home.html'); // Ruta completa de 'home.html'
    const homeHtmlContent = readFileSync(homeHtmlPath, 'utf-8'); // Lee el contenido de 'home.html'
    res.send(homeHtmlContent);
  }
}
