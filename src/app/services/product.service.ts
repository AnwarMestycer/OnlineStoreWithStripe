import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";



@Injectable({
    providedIn:'root'
})

export class ProductService{
    url = environment.BASE_API
    constructor( private http : HttpClient){

    }
    getAllProductsService(limit = '12', sort = 'desc', category?: string):Observable<Array<Product>>{
        
        return this.http.get<Array<Product>>(`${this.url}/products${
            category ? '/category/' + category : ''
        }?sort=${sort}&limit${limit}`)
    }
    getAllCategory():Observable<Array<string>>{
         return this.http.get<Array<string>>(`${this.url}/products/categories`)
    }

}