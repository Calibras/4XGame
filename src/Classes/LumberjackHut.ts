import { City } from "./City";
import { Bulding } from "./Bulding";

export class LumberjackHut extends Bulding {
    private woodProdcution: number = 1;
    public static woodCost: number = 5;
    protected name: String = "LumberjackHut";
    private myArea: City;
    constructor(myArea: City) {
      super();
      this.myArea = myArea;
      myArea.wood -= LumberjackHut.woodCost;
      this.active = false;
    }
    produce(): void {
      this.myArea.wood += this.woodProdcution;
      console.log("Prdocue von lumberjack!");
    }
  }