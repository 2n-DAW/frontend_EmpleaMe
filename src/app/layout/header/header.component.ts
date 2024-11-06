import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // estrategia para que Angular solo verifique los cambios cuando las entradas del componente o los observables de los que depende cambian explícitamente
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  currentUser!: User;
  isAuthenticated!: boolean;
  currentUserType!: String;

  ngOnInit() {
    setTimeout(() => {
      window.location.reload();
      this.cd.markForCheck();
    }, 600000);

    this.userService.populate();

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log('User:', this.currentUser);
        this.cd.markForCheck(); // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );

    this.userService.isAuthenticated.subscribe(
      (data) => {
        this.isAuthenticated = data;
        // console.log('IsAuthenticated:', this.isAuthenticated);
        this.cd.markForCheck();
         // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );

    this.userService.currentUserType.subscribe(
      (data) => {
        this.currentUserType = data;
        // console.log('UserType:', this.currentUserType);
        this.cd.markForCheck();
         // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );
  }

  logout() {
    this.userService.logout();
    this.userService.purgeAuth();
    this.router.navigate(['/']);
    // window.location.reload();
  }
}
