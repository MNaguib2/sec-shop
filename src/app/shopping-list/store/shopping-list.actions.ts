import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';

export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';

export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';

export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';

export const START_UPDATE_INGREDIENT = '[Shopping List] Start Edit';

export const STOP_UPDATE_INGREDIENT = '[Shopping List] Stop Edit';


export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payLoad : Ingredient){}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payLoad : Ingredient[]){}
}

export class UpdateIngredient implements Action {
  readonly type =  UPDATE_INGREDIENT;
  constructor(public payLoad: Ingredient) {}
}

export class StarEdit implements Action {
  readonly type = START_UPDATE_INGREDIENT;
  constructor (public payLoad: number){}
}
export class StopEdit implements Action {
  readonly type = STOP_UPDATE_INGREDIENT;
}

export class DeleteIngredient implements Action {
  readonly type =  DELETE_INGREDIENT;
}

export type ShoppingListActions =
| AddIngredient
| AddIngredients
| UpdateIngredient
| DeleteIngredient
| StarEdit
| StopEdit;
