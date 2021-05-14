import { HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'}) 
export class ProductService{

        private productUrl = 'api/products/products.json';

        constructor(private http : HttpClient){}


        getProduct() : Observable <IProduct[]>{
           return this.http.get<IProduct[]>(this.productUrl).pipe(
             tap(data =>console.log('All ',JSON.stringify(data))), // aqui o arrow funciton define como os dados serão tratados
             catchError(this.handleError)
           );
        }

        private handleError(err: HttpErrorResponse){
          //no Mundo real um app nós devemos enviar ao servidor algum dado remoto para realizar o login
          // após um 
          let errorMessage = ''; 

          if(err.error instanceof ErrorEvent){
            
            errorMessage = `An error ocurred:${err.error.message}`;

          }else{


            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
          }

          console.error(errorMessage);
          return throwError(errorMessage);

        }


      
}