import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
