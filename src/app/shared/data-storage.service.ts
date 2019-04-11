import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient : HttpClient, private recipeService : RecipeService) {}

  storeRecipes() {


    const req = new HttpRequest('PUT',
    'https://ng-recipe-book-c7b60.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(),
    {
      reportProgress: true
    });
    return this
      .httpClient
      .request(req);
  }

  getRecipes() {

    this.httpClient.get < Recipe[] > ('https://ng-recipe-book-c7b60.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).map((recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }).subscribe((recipes : Recipe[]) => {
      this
        .recipeService
        .setRecipes(recipes);
    });
  }
}
