import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';



const auuthRoutes : Routes = [
    {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(auuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
