import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
    'This is simply a test',
    'https://ifoodreal.com/wp-content/uploads/2018/02/instant-pot-frozen-chicken-2.jpg',
    [new Ingredient("Meat",1), new Ingredient("Lamb",2)]),
    new Recipe('Another Test Recipe',
    'This is simply a test',
    'https://ifoodreal.com/wp-content/uploads/2018/02/instant-pot-frozen-chicken-2.jpg',
    [new Ingredient("Meat",10), new Ingredient("Lamb",20)])
  ];

  constructor(private shoppingListService: ShoppingListService){}

   getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngreditentsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
