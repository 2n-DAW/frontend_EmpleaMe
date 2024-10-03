import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    private cd: ChangeDetectorRef
  ) {}

  currentUser!: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
        this.cd.markForCheck(); // indica a Angular que debe verificar el componente para ver si necesita actualizar la vista
      }
    );
  }
}
