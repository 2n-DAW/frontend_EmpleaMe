import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Errors } from '../../../core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { return this.formattedErrors; }

  trackByFn(index: number, item: string) {
    return index;
  }
}