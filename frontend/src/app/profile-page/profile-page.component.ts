import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private currentUser: User;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.currentUser = this._userService.getIdentity();
  }


}
