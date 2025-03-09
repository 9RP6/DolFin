import { Injectable } from '@angular/core';
import { User, UserCreate } from '../models/user.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly STORAGE_KEY = 'users';
    private users: Map<string, User>;

    constructor() {
        this.users = new Map();
        this.loadFromLocalStorage();
    }

    private loadFromLocalStorage(): void {
        const storedUsers = localStorage.getItem(this.STORAGE_KEY);
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            this.users = new Map(Object.entries(parsedUsers));
        }
    }

    private saveToLocalStorage(): void {
        const usersObject = Object.fromEntries(this.users);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usersObject));
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
        this.saveToLocalStorage();
    }

    // Delete user
    deleteUser(id: string): boolean {
        const deleted = this.users.delete(id);
        if (deleted) {
            this.saveToLocalStorage();
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
            this.saveToLocalStorage();
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
