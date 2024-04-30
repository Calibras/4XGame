import { Controller, Get, Param, Patch, Post, Response, Body, Delete } from '@nestjs/common';
import { concat } from 'rxjs';
import { CityService } from 'src/Services/City.service';


@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) { }

  //curl http://localhost:3000/city
  @Get()
  getAreaResources(): { [key: string]: number; } {
    let resourceMap = this.cityService.getResources();
    let popMap      = this.cityService.getPopInformation();
    let mergedMap:Map<string, number> = new Map([...Array.from(resourceMap.entries()), ...Array.from(popMap.entries())]);

    const obj = {};
    mergedMap.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  //curl http://localhost:3000/city/BuldingInfo
  @Get("BuldingInfo")
  getBuldingInfo(): String{
    return this.cityService.buldingInformation();
  }

  //curl -X POST http://localhost:3000/city/1
  @Post(":id")
  createBulding(@Param("id") buldingId: number): String {
    return this.cityService.setBulding(+buldingId);
  }
  //curl -X PATCH http://localhost:3000/area/123 -H "Content-Type: application/json" -d '{"aktiviert": true}'
  @Patch(":id")
  updateBuildingStatus(@Param("id") buildingId: number, @Body() updateData: { aktiviert: boolean }): string {
    return this.cityService.setActiveStatusOfBuilding(+buildingId, updateData.aktiviert);
  }

  //curl -X DELETE http://localhost:3000/city/0
  @Delete(":id")
  deleteBulding(@Param("id") buildingId: number){
    return this.cityService.destroyBulding(buildingId);

  }
  

}