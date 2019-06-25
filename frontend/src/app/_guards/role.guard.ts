import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router,
                private _userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = this._userService.getIdentity().userRole;
        console.log("guard role Works: ", role);
        if (role === 'admin') {
            // Has correct privilegies so return true
            return true;
        }else{
            this.router.navigate(['/forbidden'], {skipLocationChange: true});
            // not logged in so redirect to profile page with the return url
            return false;
        }
    }
    
}