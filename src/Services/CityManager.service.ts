import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Area } from 'src/Classes/Areas/Area'
import { City } from 'src/Classes/City';

export class CityManager {
  private static CityCount: number = 0;
  static CityList: City[] = [];
  static readonly POP_GROWTH_TIME = 10;
  static readonly MAXIMUM_BUILD_COUNT = 5;

  static CURRENT_TICK: number = 0;

  static getAreaCounter(): number{
    return CityManager.CityCount;
  }

  static tickOnAllAreas(): void{
    CityManager.CURRENT_TICK++;
    console.log("current tick " + CityManager.CURRENT_TICK);
    CityManager.CityList.forEach(city => {
      city.tick();
    });
  }
  
}