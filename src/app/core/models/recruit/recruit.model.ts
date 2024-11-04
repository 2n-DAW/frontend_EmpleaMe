import { User } from "../user.model";

export interface Recruit {
    userId: User;
    username: string;
    companyName: string;
    email: string;
    token: string;
    bio: string;
    image: string;
}