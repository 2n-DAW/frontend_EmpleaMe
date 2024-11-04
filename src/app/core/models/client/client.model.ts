import { User } from "../user.model";

export interface Client {
    userId: User;
    username: string;
    email: string;
    token: string;
    bio: string;
    image: string;
}