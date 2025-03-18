import { Injectable, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { User, UserCreate } from '../models/user.model';
import { UserService } from './db/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  currentUser: User | null
  isLoggedIn: boolean

  constructor(
    private userService: UserService
  ) {
    this.isLoggedIn = false;
    this.checkUserInStorage()
  }

  checkUserInStorage(): void {
    const user = this.retrieveCurrentUserFromLocalStorage()
    if (user) {
      const lastLogin = new Date(user.lastLogin);
      const currentTime = new Date();
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
      console.log("Checking current user");
      console.log(currentTime.getTime(), lastLogin.getTime(), currentTime.getTime() - lastLogin.getTime(), fiveMinutes);
      if (currentTime.getTime() - lastLogin.getTime() < fiveMinutes) {
        this.currentUser = user;
        this.isLoggedIn = true;
      }
    }
  }

  ngOnInit(): void {
      
  }

  // Login a user with his email or username and his password
  login(username: string, password: string, remember: boolean) {
    let user = this.userService.getUserByUsername(username);
    if (!user) {
      user = this.userService.getUserByEmail(username)
      if (!user) return { "user": user, err: "User not found" };
    };

    if (user.password == password) {
      this.currentUser = user
      this.isLoggedIn = true;

      // update last login of user
      const newLogin = new Date() 
      user.lastLogin= newLogin
      this.userService.updateUserProperty(user.id, "lastLogin", newLogin)

      // store in persistent storage (similar to cookies)
      if (remember) {
        this.storeCurrentUserInLocalStorage(user)
      }

      return { user, err: null };
    } else {
      return { user: null, err: "Invalid Credentials" };
    }
  }

  register(userIn: UserCreate) {
    console.log("userIn: ");
    console.log(userIn)
    let checkUser = this.userService.getUserByEmail(userIn.email)
    if (checkUser) {
      return {
        "user": null,
        "err": "User already exists"
      };
    }
    if (userIn.username) {
      let checkUser1 = this.userService.getUserByUsername(userIn.username)
      if (checkUser1) {
        return {
          "user": null,
          "err": "User already exists"
        };
      }
    }

    const newUser = {
      id: uuidv4(),
      username: userIn.username, // Assuming email as username for simplicity
      email: userIn.email,
      password: userIn.password,
      firstName: userIn.firstName,
      lastName: userIn.lastName,
      createdAt: new Date(),
    };
    this.userService.setUser(newUser);

    // set class flags
    return this.login(newUser.username, newUser.password, false)
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;

    this.storeCurrentUserInLocalStorage(null)
  }

  storeCurrentUserInLocalStorage(user: User | null) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  retrieveCurrentUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
