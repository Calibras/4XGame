import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './Controller/cat.controller';
import { catService } from './Services/cat.service';
import { CityManager } from './Services/CityManager.service';
import {CityController} from './Controller/CityController'
import { AreaController } from './Controller/Area.controller';
import { CityService } from './Services/City.service';
import { AreaService } from './Services/Area.service';

@Module({
  imports: [],
  controllers: [AppController, CatController, CityController, AreaController],
  providers: [AppService, catService, CityService, CityManager, AreaService],
})
export class AppModule {}
