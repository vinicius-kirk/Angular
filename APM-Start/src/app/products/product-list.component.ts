import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {


    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    productServices: ProductService;
    erroMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ', value)
        this.filteredProducts = this.performFilter(value);

    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private _productService: ProductService) {
        this.productServices = _productService;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }
    ngOnInit(): void {

        this.sub = this.productServices.getProduct().subscribe({
            next: products => { this.products = products, this.filteredProducts = this.products; },
            error: err => this.erroMessage = err
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}

