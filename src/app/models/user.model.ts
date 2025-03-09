export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    createdAt: Date;
    lastLogin?: Date;
}

export interface UserCreate {
    username?: string,
    email: string,
    firstName: string,
    lastName: string
    password: string
}