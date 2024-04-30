import { Controller, Get } from '@nestjs/common';
import { catService } from '../Services/cat.service';

@Controller("cat")
export class CatController {
  constructor(private readonly catService: catService) {}

  @Get()
  getCat(): string {
    return this.catService.getCat();
  }
}
