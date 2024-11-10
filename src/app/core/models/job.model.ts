import { Profile } from "./profile.model";
import { Category } from "./category.model";
import { Contract } from "./contract.model";
import { WorkingDay } from "./workingDay.model";
import { Province } from "./province.model";
import { Comment } from "./comment.model";

export interface Job {
    slug: string;
    name: string;
    author: Profile;
    description: string;
    salary: number;
    images: [],
    img: string,
    id_cat: Category;
    id_contract: Contract;
    id_workingDay: WorkingDay;
    id_province: Province;
    favorited: boolean;
    favoritesCount: number;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    isInscripted: number;
}



export interface UserJobs {
    jobs: Job[];
    job_count: number;
    is_owner: boolean;
}