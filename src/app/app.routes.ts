import { Routes } from '@angular/router';
import { HomeComponent } from './components/layouts/shared/home/home.component';
import { LoginComponent } from './components/layouts/shared/login/login.component';
import { NotFoundComponent } from './components/layouts/shared/not-found/not-found.component';
import { ProductComponent } from './components/layouts/shared/product/product.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch:'full'},
    {path: 'home',component:HomeComponent},
    {path: 'productos',component:ProductComponent},
    {path: 'login', component:LoginComponent},
    {path: '**',component:NotFoundComponent}
];
