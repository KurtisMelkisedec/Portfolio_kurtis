export class imageResponse{
    id:number|null
    image:Blob
    constructor(id:number|null,image:Blob) {
        this.id = id;
        this.image = image;
        
    }
}