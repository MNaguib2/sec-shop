import { ShoppingListState,  shoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer, authState } from 'src/app/auth/store/auth.reducer';


export const rootReducer = {};

export interface AppState {
    shoppingList: ShoppingListState;
    auth: authState | any;
};


export const reducers: ActionReducerMap<AppState , any> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
}
