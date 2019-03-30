import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({selector: 'app-recipe-list', templateUrl: './recipe-list.component.html', styleUrls: ['./recipe-list.component.css']})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes : Recipe[];
  // recipes: Recipe[] = [   new Recipe('A Test Recipe',   'This is simply a
  // test',
  // 'https://ifoodreal.com/wp-content/uploads/2018/02/instant-pot-frozen-chicken-2
  // .jpg'),   new Recipe('Another Test Recipe',   'This is simply a test',
  // 'https://ifoodreal.com/wp-content/uploads/2018/02/instant-pot-frozen-chicken-2
  // .jpg') ];
  constructor(private recipeService : RecipeService, private router : Router, private route : ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this
      .recipeService
      .getRecipes();

    this.recipeService.recipeChanged.subscribe((recipes: Recipe[])=>{
      this.recipes=recipes;
    });
  }

  // onRecipeSelected(recipe: Recipe) {   this.recipeWasSelected.emit(recipe); }

  onSelectNewRecipe() {
    this
      .router
      .navigate(['new'], {relativeTo: this.route});
  }

}
