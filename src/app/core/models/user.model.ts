export interface User {
    username: string;
    email: string;
    token: string;
    bio: string;
    image: string;
    userType: string;
}

export interface UserList {
    users: User[];
    user_count: number;
    is_owner: boolean;
}

// export interface UserType {
//     email: string;
//     userType: string;
// }