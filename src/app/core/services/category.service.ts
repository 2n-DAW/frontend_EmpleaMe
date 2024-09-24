import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.model';
const URL = 'http://127.0.0.1:3000/categories';
const URL_select = 'http://127.0.0.1:3000/categories_select_filter';

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) { }

    all_categories(params: any): Observable<Category[]> {
        return this.http.get<Category[]>(URL, { params });
    }

    all_categories_select(): Observable<Category[]> {
        return this.http.get<Category[]>(URL_select)
    }

}

export type { Category };
