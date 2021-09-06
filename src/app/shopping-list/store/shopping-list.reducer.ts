import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState{
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState:  ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient : null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state : ShoppingListState = initialState,
   action: ShoppingListActions.ShoppingListActions) : ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payLoad]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payLoad]
      };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const Ingredient = state.ingredients[state.editedIngredientIndex];
        const updateingredient = {
          ...Ingredient,
          ...action.payLoad
        };
        const updateIngredients = [...state.ingredients];
        updateIngredients[state.editedIngredientIndex] = updateingredient;
        return {
          ...state,
          ingredients: [...updateIngredients]
        };
        case ShoppingListActions.DELETE_INGREDIENT:

        return{
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex)=> {
            return igIndex !== state.editedIngredientIndex;
          }),
          editedIngredient: null,
          editedIngredientIndex: -1
        };
        case ShoppingListActions.START_UPDATE_INGREDIENT:
          return{
            ...state,
            editedIngredientIndex : action.payLoad,
            editedIngredient : {...state.ingredients[action.payLoad]}
          };
        case ShoppingListActions.STOP_UPDATE_INGREDIENT:
          return{
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
          };
      default:
        return state;
    }
}
