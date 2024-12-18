import { Routes } from '@angular/router';
import { HomeComponent } from './components/layouts/shared/home/home.component';
import { LoginComponent } from './components/layouts/shared/login/login.component';
import { NotFoundComponent } from './components/layouts/shared/not-found/not-found.component';
import { ProductComponent } from './components/layouts/shared/product/product.component';
import { RegisterComponent } from './components/layouts/shared/register/register.component';
import { FaqComponent } from './components/layouts/shared/faq/faq.component';
import { CartComponent } from './components/layouts/shared/cart/cart.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch:'full'},
    {path: 'home',component:HomeComponent},
    {path: 'productos',component:ProductComponent},
    {path: 'faq',component:FaqComponent},
    {path: 'cart',component:CartComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: '**',component:NotFoundComponent}
];
