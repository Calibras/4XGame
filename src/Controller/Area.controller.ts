import { Controller, Get, Param, Patch, Post, Response, Body, Delete } from '@nestjs/common';
import { Area } from 'src/Classes/Areas/Area';
import { AreaService } from 'src/Services/Area.service';
import { CityManager } from 'src/Services/CityManager.service';


@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  //curl http://localhost:3000/area
  @Get()
  getScoutableAreas(): number[]{
    let areas: Area[] = this.areaService.getScoutableAreas()
    let ids: number[] = []
    //ids raushollen
    areas.forEach(element => {
      ids.push(element.getId())
    });
    return ids
  }
  //curl -X POST http://localhost:3000/area/id
  @Post(":id")
  scoutArea(@Param("id") areaID: number) {
    this.areaService.scoutArea(areaID)
  }
  //curl -X POST http://localhost:3000/area/CreateCity
  @Post('CreateCity/:id')
  settleCity(@Param('id') areaId: number) {
    this.areaService.settleArea(areaId)
    console.log(CityManager.CityList.length)
  }


}