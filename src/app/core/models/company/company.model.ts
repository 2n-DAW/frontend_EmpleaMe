import { User } from "../user.model";

export interface Company {
    userId: User;
    username: string;
    companyName: string;
    email: string;
    token: string;
    bio: string;
    image: string;
}