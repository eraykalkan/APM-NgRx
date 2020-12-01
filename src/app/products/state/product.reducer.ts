import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductPageActions, ProductApiActions } from './actions';

export interface ProductState {
    showProductCode: boolean;
    //currentProduct: Product;
    currentProductId: number | null;
    products: Product[];
    error: string
}

const initialState: ProductState = {
    showProductCode: true,
    //currentProduct: null,
    currentProductId: null,
    products: [],
    error: ''
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            //currentProduct: action.product
            currentProductId: action.currentProductId
        }
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            //currentProduct:null
            currentProductId: null
        }
    }),
    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            /*currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0

            }*/
            currentProductId: 0
        }
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        };
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);