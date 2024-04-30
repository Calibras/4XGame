import { Injectable } from '@nestjs/common';
import { City } from 'src/Classes/City';
import { FishingHut } from 'src/Classes/FishingHut';
import { Bulding } from 'src/Classes/Bulding';
import { LumberjackHut } from 'src/Classes/LumberjackHut';
import { CityManager } from './CityManager.service';
import { Area } from 'src/Classes/Areas/Area';
import { AreaManager } from './AreaManager.service';

@Injectable()
export class AreaService {
    private knownAreas: Area[] = [];
    constructor(){
        this.knownAreas.push(AreaManager.AreaList[0]);
    }
    
    public getScoutableAreas(): Area[]{
        let scoutableAreas: Area[] = [];
        this.knownAreas.forEach(area => {
            area.getAdjacentArea().forEach(adjacentArea => {
                if (!scoutableAreas.some(uniqueArea => uniqueArea.getId() === adjacentArea.getId())) {
                    scoutableAreas.push(adjacentArea);
                }
            });
        });

        //knownAreas rausfiltern
        scoutableAreas.forEach(area =>{
            this.knownAreas.forEach(knownArea => {
                if(area.getId() === knownArea.getId()){
                    scoutableAreas = scoutableAreas.filter(element => element.getId() !== area.getId());
                }
            })
        })
    
        return scoutableAreas;
    }
    private isAreaInKnownAreas(area: Area): boolean{
        this.knownAreas.forEach(element => {
            if(element.getId() === area.getId()){
                return true;
            }
        });
        return false;
    }

    public scoutArea(id: number): void{
        if(this.isAreaInKnownAreas(AreaManager.AreaList[id])){
            return;
        }
        this.knownAreas.push(AreaManager.AreaList[id]);
    }
    public settleArea(id: number): void{
        if(this.isAreaInKnownAreas(AreaManager.AreaList[id])){
            CityManager.CityList.forEach(city => {
                if(city.getArea().getId() === id){
                    return
                }
            });
            CityManager.CityList.push(new City(100,100,AreaManager.AreaList[id]))
        }
        return
    }
  
}
