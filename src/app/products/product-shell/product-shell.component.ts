import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductApiActions, ProductPageActions } from '../state/actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  products$: Observable<Product[]>;
  selectedProducts$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {  

    this.store.dispatch(ProductPageActions.loadProducts());
    
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);    

    this.selectedProducts$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  ngOnDestroy(): void {
  }

  checkChanged(): void {
    this.store.dispatch(
      ProductPageActions.toggleProductCode()
    );
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.store.dispatch(ProductActions.setCurrentProduct({ product }));
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
