import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private store: Store<fromApp.AppState>){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}
