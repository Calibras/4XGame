import { Injectable } from '@nestjs/common';
import { City } from 'src/Classes/City';
import { FishingHut } from 'src/Classes/FishingHut';
import { Bulding } from 'src/Classes/Bulding';
import { LumberjackHut } from 'src/Classes/LumberjackHut';
import { CityManager } from './CityManager.service';

@Injectable()
export class CityService {
    private city: City;

    constructor(){
        this.city = CityManager.CityList[0];
    }
  getResources(): Map<string, number>{
    const myMap = new Map<string, number>();
    myMap.set("holz", this.city.wood);
    myMap.set("fisch", this.city.fish);
    
    return myMap;
  }

  setBulding(id: number): String{
    if(this.city.buildingList.length === CityManager.MAXIMUM_BUILD_COUNT){
      return "Kein platz mehr!";
    }
    if(id === 1){
      if(this.city.wood - FishingHut.woodCost > -1){
        this.city.setBulding(new FishingHut(this.city));
        this.city.buildingList
        return "Fishing hut wurde gebaut!";
      }else{
        return "Nicht genug Holz"
      }
    }
    if(id === 2){
      if(this.city.wood - LumberjackHut.woodCost > -1){
        this.city.setBulding(new LumberjackHut(this.city));
        this.city.buildingList
        return "Lumberjack hut wurde gebaut!";
      }else{
        return "Nicht genug Holz"
      }
    }
    return "unbekantes gebeude";
  }
  
  buldingInformation(){
    var buildingName: String = "";
    var buildingStatus: String = "";
    this.city.buildingList.forEach(bulding => {
      if(bulding != null){
        buildingName.concat(bulding.getName().toString());
        buildingName.concat("          ");
        if(bulding.getActivity()){
          buildingStatus.concat("ACTIVE          ");
        }else{
          buildingStatus.concat("NOT ACTIVE      ");
        }
      }
    });
    return buildingName.concat("\n").concat(buildingStatus.toString());
  }
  

  setActiveStatusOfBuilding(id: number, activity: boolean): string{
    if(id >= this.city.buildingList.length){
      return "invalide Id!";
    }
    if(activity){
      if(this.city.popManager.isFreePopAvaliable()){
        this.city.setActiveStatusOfBuilding(id, true);
        this.city.popManager.hirerPop()
        return "Gebeude wurde aktiviert!";
      }
      return "gebeude kann nicht aktiviert weden, kein freier pop";
    }
    this.city.setActiveStatusOfBuilding(id, false);
    this.city.popManager.freeHirerPop();
    return "Gebeude wurde deaktiviert, neuer freier pop!";
  }
  getPopInformation(): Map<string, number>{
    const myMap = new Map<string, number>();
    myMap.set("currentPop", this.city.popManager.getPopCount());
    myMap.set("FreePopCount", this.city.popManager.getFreePopCount());
    myMap.set("CurrentPopGrowth", this.city.popManager.getPopGrowth());
    myMap.set("neded pop growth", CityManager.POP_GROWTH_TIME);
    return myMap;
  }
  destroyBulding(id: number): String{
    if(id >= this.city.buildingList.length){
      return "invalide Id!";
    }
    this.setActiveStatusOfBuilding(id, false);
    this.city.buildingList.splice(id, 1);

    return "Gebeude zerstört!";
  }
}
