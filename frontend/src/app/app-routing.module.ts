import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { PrivateComponent } from './private/private.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { RoleGuard } from './_guards/role.guard';

const appRoutes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'private-area', component: PrivateComponent, canActivate: [AuthGuard, RoleGuard] },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'blog', component: BlogPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);