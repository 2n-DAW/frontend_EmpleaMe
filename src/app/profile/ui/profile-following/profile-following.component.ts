import { Component } from '@angular/core';
import { ListUsersComponent } from '../../../shared/components/list-users/list-users.component';

@Component({
  selector: 'app-profile-following',
  standalone: true,
  imports: [ListUsersComponent],
  templateUrl: './profile-following.component.html',
  styleUrl: './profile-following.component.css'
})
export class ProfileFollowingComponent {

}
