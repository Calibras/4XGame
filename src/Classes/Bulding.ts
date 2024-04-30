export class Bulding {
    active : boolean;
    protected name: String;
    constructor() {
      this.active = false;
    }
    setActivity(active: boolean){
      this.active = active;
    }
    getActivity(): boolean{
      return this.active;
    }
    
    tick(): void{
      if(this.active){
        this.produce();
      }
    }
    //overide
    produce(): void{
      console.log("produciton nicht überschreiben")
    }
    public getName(): String{
      return this.name;
    }
  }