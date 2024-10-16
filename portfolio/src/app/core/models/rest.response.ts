export interface RestResponse<T>{
    totalItems?:number,
    pages?:number [] 
    totalPages:number,
    currentPage:number,
    results:T
    status:number

    
}