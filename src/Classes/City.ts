import { Bulding } from "./Bulding";
import { Area } from "./Areas/Area";
import { CityManager } from "src/Services/CityManager.service";

export class City{
    private area: Area;
    private fishIncome: number;
    private id: number;
    buildingList: Bulding[] = [];
    popManager: PopManager;
    constructor(public wood: number, public fish: number, public cityArea: Area) {
        this.popManager = new PopManager(1);

        this.id = CityManager.getAreaCounter();
        CityManager.CityList.push(this);
        this.area = cityArea;
    }
    setBulding(building: Bulding){
      this.buildingList.push(building);
    }
    tick(): void{
      this.buildingList.forEach(bulding =>{
        bulding.tick();
      })
      this.popManager.addPopGrowth(1);
      this.feedPop();
    }
    setActiveStatusOfBuilding(id: number, activity: boolean){
      this.buildingList[id].setActivity(activity);
    }

    feedPop(){
      if(this.fish >= this.popManager.getPopCount()){
        this.fish -= this.popManager.getPopCount();
      }else{
        console.log("NICHT GENUG FISC AAAAAAARG!");
      }
    }
    public getArea(): Area{
      return this.area
    }
  }
  export class PopManager{
    private pop: number;
    private freePop: number;
    private popGrowth: number = 0;

    constructor(initialPopCount: number) {
      this.pop = initialPopCount;
      this.freePop = initialPopCount;
  }

  public getPopGrowth(): number{
    return this.popGrowth;
  }
    public addPopGrowth(growth: number): void{
      this.popGrowth += growth;
      if(this.popGrowth >= CityManager.POP_GROWTH_TIME){
        this.popGrowth -= CityManager.POP_GROWTH_TIME;
        this.pop += 1;
        this.freePop += 1;
      }
    }
    public getPopCount(): number{
      return this.pop;
    }
    public getFreePopCount(): number{
      return this.freePop;
    }
    public hirerPop(): boolean{
      if(this.freePop - 1 < 0){
        return false;
      }
      this.freePop--;
      return true;
    }
    public freeHirerPop(): void{
      this.freePop++;
    }
    public isFreePopAvaliable(): boolean{
      if(this.freePop >= 1){
        return true;
      }
      return false;
    }
    public reducePopCount(count: number): void{
    }
    public addPopCount(count: number): void{

    }

  }