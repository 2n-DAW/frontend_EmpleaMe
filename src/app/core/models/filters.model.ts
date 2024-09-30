export class Filters {
    [key: string]: any;
    limit?: number;
    offset?: number;
    page?: number;
    salary_min?: number;
    salary_max?: number;
    category?: string;
    contract?: string;
    workingDay?: string;
    province?: string;
    name?: string;
    
    constructor(
        limit?: number,
        offset?: number,
        page?: number,
        salary_min?: number,
        salary_max?: number,
        category?: string,
        contract?: string,
        workingDay?: string,
        province?: string,
        name?: string,
    ) 
    {
        this.limit = limit || 2;
        this.offset = offset || 0;
        this.page = page || 1;
        this.salary_min = salary_min;
        this.salary_max = salary_max;
        this.category = category;
        this.contract = contract;
        this.workingDay = workingDay;
        this.province = province;
        this.name = name;
    }

    public length(): number {
        let count: number = 0;
        if (this.salary_min) count++;
        if (this.salary_max) count++;
        if (this.category) count++;
        if (this.contract) count++;
        if (this.workingDay) count++;
        if (this.province) count++;
        if (this.name) count++;
        return count;
    }
}