import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { ProfilesService } from '../../../core/services';
import { User } from '../../../core/models';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CardUserComponent, InfiniteScrollDirective],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  offset = 0;
  limit = 4;
  users: User[] = [];
  username: string = '';

  constructor(private ProfilesService: ProfilesService, private ActivatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  // Inicia 
  ngOnInit(): void {
    this.getUsers();
  }

  // Cargamos las categorias
  getUsers() {
    this.ActivatedRoute.parent?.paramMap.subscribe(params => {
      this.username = params.get('username') ?? '';
      // Creamos objeto con offset y limit

    });

    const params = this.getRequestParams(this.offset, this.limit);

    this.ProfilesService.allFollowers(this.username, params).subscribe(
      (data: any) => {
        this.users = data.users;
        console.log(this.users);
        this.limit = this.limit + 4;
        this.cdr.detectChanges();
      }
    );
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  scroll() {
    this.getUsers();
  }
}
