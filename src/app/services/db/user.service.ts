import { Injectable } from '@angular/core';
import { User, UserCreate } from '../../models/user.model';

import { UtilsService } from '../utils.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly STORAGE_KEY = 'users';
    private users: Map<string, User>;

    constructor(
        private utils: UtilsService
    ) {
        this.load();
    }

    private load(): void {
        const storedUsers = this.utils.getFromDB(this.STORAGE_KEY);
        console.log("loaded from Users DB: ");
        console.log(storedUsers)
        if (storedUsers) {
            // const parsedUsers = JSON.parse(storedUsers);
            this.users = new Map(Object.entries(storedUsers));
        } else {
            this.users = new Map()
        }
    }

    private save(): void {
        console.log("saving to users DB:");
        console.log(this.users)
        const usersObject = Object.fromEntries(this.users);
        // const usersJSON = JSON.stringify(usersObject);
        this.utils.setToDB(this.STORAGE_KEY, usersObject)
    }

    // Get all users
    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    // Get user by ID
    getUserById(id: string): User | undefined {
        return this.users.get(id);
    }

    // Add or update user
    setUser(user: User): void {
        this.users.set(user.id, user);
        this.save();
    }

    // Delete user
    deleteUser(id: string): boolean {
        const deleted = this.users.delete(id);
        if (deleted) {
            this.save();
        }
        return deleted;
    }

    // Clear all users
    clearUsers(): void {
        this.users.clear();
        localStorage.removeItem(this.STORAGE_KEY);
    }

    // Check if user exists
    hasUser(id: string): boolean {
        return this.users.has(id);
    }

    updateUserProperty(id: string, property: string, value: any): boolean {
        const user = this.users.get(id);
        if (user) {
            user[property] = value;
            this.save();
            return true;
        }
        return false;
    }

    // Get total number of users
    getUserCount(): number {
        return this.users.size;
    }
    // Get user by email
    getUserByEmail(email: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.email === email);
    }

    // Get user by username
    getUserByUsername(username: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.username === username);
    }
}
