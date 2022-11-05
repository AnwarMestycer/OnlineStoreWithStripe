import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  productsSubscription: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  onColumnsCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onAddToCart(product: Product): void {
    this.cartService.AddToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  getAllProducts(): void {
    this.productsSubscription = this.productService
    .getAllProductsService(this.count, this.sort, this.category)
    .subscribe((_products) => {
      this.products = _products;
    });
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getAllProducts()
  }
  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getAllProducts();
  }
  onSortChange(newSort : string): void{
    this.sort = newSort;
    this.getAllProducts();


  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
