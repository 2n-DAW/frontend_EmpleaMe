import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // estrategia para que Angular solo verifique los cambios cuando las entradas del componente o los observables de los que depende cambian explícitamente
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  currentUser!: User;
  isAuthenticated!: boolean;

  ngOnInit() {
    setTimeout(() => {
      window.location.reload();
      this.cd.markForCheck();
    }, 600000);

    this.userService.populate();

    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData);
        this.currentUser = userData;
        this.cd.markForCheck(); // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );

    this.userService.isAuthenticated.subscribe(
      (data) => {
        console.log('isAuthenticated', data);
        this.isAuthenticated = data;
        this.cd.markForCheck();
         // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );
  }

  logout() {
    this.userService.logout();
    this.userService.purgeAuth();
  }
}
