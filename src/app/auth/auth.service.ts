import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((response)=>{
        console.log(response);
      })
      .catch(error=>console.log(error));
  }

}
