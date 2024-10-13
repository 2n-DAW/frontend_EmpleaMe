export interface User {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}


export interface UserList {
  users: User[];
  user_count: number;
  is_owner: boolean;
}