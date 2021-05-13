import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    
    
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage : boolean = false;
    productServices : ProductService;


    private _listFilter : string = '';
    get listFilter() : string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        console.log('In setter: ', value)
        this.filteredProducts = this.performFilter(value);

    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private _productService : ProductService){
                this.productServices = _productService;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string) : void{
        this.pageTitle = 'Product List ' + message;
    }
    ngOnInit(): void {
        
        this.products = this.productServices.getProduct();
        this.filteredProducts = this.products;
    }

    
} 

