import { AreaManager } from "src/Services/AreaManager.service";

export class Area {
    protected size: number;
    protected adjacentArea: Area[];
    private id: number;

    constructor(size: number, adjacentArea: Area[]) {
        this.size = size;
        this.adjacentArea = [];
        this.adjacentArea = this.adjacentArea.concat(adjacentArea);
        this.id = AreaManager.AreaCount++;
    }

    public getSize(): number{
        return this.size;
    }
    public getAdjacentArea(): Area[]{
        return this.adjacentArea;
    }
    public addAdjacentArea(adjacentArea: Area[]){
        this.adjacentArea = this.adjacentArea.concat(adjacentArea);
    }
    public setAdjacentArea(adjacentArea: Area[]){
        this.adjacentArea = adjacentArea;
    }

    public getId(): number{
        return this.id;
    }
}