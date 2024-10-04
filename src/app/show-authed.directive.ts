import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserService } from './core/services';

@Directive({
  selector: '[appShowAuthed]',
  standalone: true
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  condition: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) { // si esta autenticado y la condicion es verdadera o no esta autenticado y la condicion es falsa
          this.viewContainer.createEmbeddedView(this.templateRef); // crea una vista embebida
        } else {
          this.viewContainer.clear(); // limpia la vista
        }
      }
    );
  }

  @Input() set appShowAuthed(condition: boolean) { // recibe una condicion
    console.log('appShowAuthed condition:', condition);
    this.condition = condition;
  }

}