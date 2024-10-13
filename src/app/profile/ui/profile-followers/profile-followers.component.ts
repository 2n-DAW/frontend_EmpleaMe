import { Component } from '@angular/core';
import { ListUsersComponent } from '../../../shared/components/list-users/list-users.component';

@Component({
  selector: 'app-profile-followers',
  standalone: true,
  imports: [ListUsersComponent],
  templateUrl: './profile-followers.component.html',
  styleUrl: './profile-followers.component.css'
})
export class ProfileFollowersComponent {

}
