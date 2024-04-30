import { City } from "./City";
import { Bulding } from "./Bulding";

export class FishingHut extends Bulding {
    private fishProduction: number = 10;
    public static woodCost: number = 5;
    protected name: String = "FishingHut";
    private myArea: City;
    constructor(myArea: City) {
      super();
      this.myArea = myArea;
      myArea.wood -= FishingHut.woodCost;
      this.active = false;
    }
    produce(): void {
      this.myArea.fish += this.fishProduction;
      console.log("Prdocue von Fish!");
    }
  }