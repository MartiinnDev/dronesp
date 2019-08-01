import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    private token;

    constructor(private userService: UserService,
                private _authService: AuthenticationService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        if(confirm("Estas seguro de eliminar PERMANENTEMENTE este usuario?")){
            this.userService.delete(id).pipe(first()).subscribe(() => { 
                this.loadAllUsers() 
            });
        }
        else{

        }
    }

    toggleUserRole(user: User) {
        this.userService.updateUserRole(user).pipe(first()).subscribe(() => { 
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
    }

}