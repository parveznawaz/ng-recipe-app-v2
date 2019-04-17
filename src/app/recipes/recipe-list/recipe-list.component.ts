import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducer';

@Component({selector: 'app-recipe-list', templateUrl: './recipe-list.component.html', styleUrls: ['./recipe-list.component.css']})
export class RecipeListComponent implements OnInit {
  recipeState : Observable<fromRecipe.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  // onRecipeSelected(recipe: Recipe) {   this.recipeWasSelected.emit(recipe); }

  onSelectNewRecipe() {
    this
      .router
      .navigate(['new'], {relativeTo: this.route});
  }


}
