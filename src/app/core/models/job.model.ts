import { Category } from "./category.model";
import { Contract } from "./contract.model";
import { WorkingDay } from "./workingDay.model";
import { Province } from "./province.model";

export interface Job {
    slug: string;
    name: string;
    author: string;
    description: string;
    salary: number;
    images: [],
    img: string,
    id_cat: Category;
    id_contract: Contract;
    id_workingDay: WorkingDay;
    id_province: Province;
}
