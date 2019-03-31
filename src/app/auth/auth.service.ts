import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { isUndefined, isNull } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((response)=>{
        console.log(response);
      })
      .catch(error=>console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response=> {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token:string)=>{
                this.token = token;
              }
            )
        }
      )
      .catch(
        error=>console.log(error)
      );      
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
            .then(
              (token:string)=>{
                this.token = token;
              }
            )
    return this.token;
  }

  isAuthenticated() {
    return !isUndefined(this.token) && !isNull(this.token);
  }

  logout() {
    firebase.auth().signOut();
    this.token=null;
  }

}
