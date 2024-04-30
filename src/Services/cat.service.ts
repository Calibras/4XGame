import { Injectable } from '@nestjs/common';

@Injectable()
export class catService {
  getCat(): string {
    return "Hello Cat!";
  }
}
