import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  categories: Array<string> = []
  categoriesSubscription: Subscription | undefined;
  constructor( private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategory()
    .subscribe((response)=> {
             this.categories = response
       })
  }
  
  onShowCategory(category : string) : void{
    this.showCategory.emit(category);
  }
ngOnDestroy(): void {
    if(this.categoriesSubscription){
       this.categoriesSubscription.unsubscribe()
    }
}

}
