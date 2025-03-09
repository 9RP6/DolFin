import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { User, UserCreate } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User
  isLoggedIn: boolean

  constructor(
    private userService: UserService
  ) { }

  // Login a user with his email or username and his password
  login(username: string, password: string) {
    let user = this.userService.getUserByUsername(username);
    if (!user) {
      user = this.userService.getUserByEmail(username)
      if (!user) return {"user": user, err: "User not found"};
    };

    if (user.password == password) {
      this.currentUser = user
      this.isLoggedIn = true;

      // update last login of user
      this.userService.updateUserProperty(user.id, "lastLogin", new Date())

      return {user, err: null};
    } else {
      return {user: null, err: "Invalid Credentials"};
    }
  }

  register(userIn: UserCreate) {
  console.log("userIn: " + userIn);
    let checkUser = this.userService.getUserByEmail(userIn.email)
    if (checkUser) {
      return {
        "user": null,
        "err": "User already exists"};
    }
    if (userIn.username) {
      let checkUser1 = this.userService.getUserByUsername(userIn.username)
      if (checkUser1) {
        return {
          "user": null,
          "err": "User already exists"};
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
    this.currentUser = newUser
    this.isLoggedIn = true;
    console.log(this.currentUser, this.isLoggedIn);

    return {
      "user": newUser,
      "err": ""
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
  }
}
