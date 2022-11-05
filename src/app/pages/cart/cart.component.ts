import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 50,
        quantity: 13,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Shoes",
        price: 63,
        quantity: 20,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart : Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart():void{
    this.cartService.clearCart();
  }
  onRemoveItem(item : CartItem):void{
    this.cartService.removeFromCart(item)
  }
 onAddQuantity(item : CartItem):void{
  this.cartService.AddToCart(item)
 }
 onRemoveQuantity(item : CartItem):void{
  this.cartService.removeQuantity(item)
 }
 onCheckout():void{
  this.http.post('http://localhost:4242/checkout', {
    items: this.cart.items
  }).subscribe(async(res : any) => {
    let stripe = await loadStripe('pk_test_51M0NDADI2xYdtF66SXuS0UjoyIgKDfLDVj0Wi7xuIxSiXiW612tzpJrESmXQVQaYjgQd5RQeEQflLlEQ7FjBEaMG00jUAoZnd2');
    stripe?.redirectToCheckout({
      sessionId : res.id
    })
  })
 }
}
