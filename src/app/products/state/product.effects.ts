import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
            ))
        );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.updateProduct),
                concatMap(action =>
                    this.productService.updateProduct(action.product)
                        .pipe(
                            map(product => ProductApiActions.updateProductSuccess({ product })),
                            catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                        )
                )
            )
    }
    );
}