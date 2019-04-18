import {Effect, ofType, Actions} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import {HttpClient,HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this
    .actions$
    .pipe(ofType(RecipeActions.FETCH_RECIPES))
    .switchMap((action : RecipeActions.FetchRecipes) =>
      {
      return this.httpClient.get < Recipe[] > ('https://ng-recipe-book-c7b60.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      }).map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      });
    });

  @Effect({dispatch:false})
  recipeStore = this.actions$
              .pipe(ofType(RecipeActions.STORE_RECIPE))
              .withLatestFrom(this.store.select('recipes'))
              .switchMap(([action, state])=>{
                const req = new HttpRequest('PUT',
                    'https://ng-recipe-book-c7b60.firebaseio.com/recipes.json',
                    state.recipes,
                    {
                      reportProgress: true
                    });
                    return this.httpClient.request(req);
              });

  constructor(private actions$ : Actions,
              private httpClient : HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
