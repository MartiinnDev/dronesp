import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  private loginSuscriptions: Subscription = null

  constructor(private _userService: UserService,
              private _authService: AuthenticationService) {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

   ngOnInit() {
      this.currentUser = this._userService.getIdentity();
    } 

    ngDoCheck(){
      this.currentUser = this._userService.getIdentity();
    }

    subscribeUserlogin(): any {
      this.loginSuscriptions = this._userService.isLoggedIn().subscribe(
        (response) => {
          if (response) {
            this.currentUser = this._userService.getIdentity();
          } else {
            this.removeDataStorage();
          }
        }
      );
      // Subscribe to change user data (update user data from profile component)
      this.loginSuscriptions = this._userService.userDataChanged().subscribe(
        (response) => {
          this.currentUser = this._userService.getIdentity();
        }
      );
    }

    removeDataStorage() {
      this.currentUser = null;
      this._authService.logout();
    }

    logout(){
      this.removeDataStorage();
    }

    toggleMenu(){
      if(document.getElementById('navbarSupportedContent').style.display != 'none'){
        document.getElementById('navbarSupportedContent').style.display = 'none';
      }else{
        document.getElementById('navbarSupportedContent').style.display = 'flex';
      }
    }
    

  

}
