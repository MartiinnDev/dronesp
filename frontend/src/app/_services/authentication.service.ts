import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    private _loggedInUser?: User;

    public AUTH_SERVER: string = 'http://192.168.0.155:4000';

    get loggedInUser(): User {
        return this._loggedInUser;
    }
    set loggedInUser(user: User) {
        this._loggedInUser = user;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.AUTH_SERVER}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedInUser = user;
                }
                return user;
            }));
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedInUser = null;
    }
}