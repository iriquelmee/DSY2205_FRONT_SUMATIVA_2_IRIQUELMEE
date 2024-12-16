import { Component, OnChanges } from '@angular/core';
import {nav} from '../../../../data/index'
import { RouterLink } from '@angular/router';
import { User } from '../../../../interfaces/user.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  providers: [RouterLink]
})
export class NavComponent implements OnChanges {
  
  constructor (_router : RouterLink){

  }
  
  navTitle:string = "DSY2205 Store";

  navLinks : any = nav;

  user : any | undefined;


  ngOnInit()
  {
    console.log("Cargando: app-nav ");
    this.loadUserFromLocalStorage();
    this.loadNav();
  }

  logout(){
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.user = undefined;
        localStorage.removeItem("currentUser");

        
      } else {
        console.log("No user found in localStorage.");
      }
    } catch (ex) {
      this.user = undefined;
      console.log("Error al cargar el usuario:", ex);
    }
  }

  ngOnChanges(){
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.user = JSON.parse(userData);
        console.log("Usuario cargado:", this.user);
      } else {
        console.log("No user found in localStorage.");
      }
    } catch (ex) {
      this.user = undefined;
      console.log("Error al cargar el usuario:", ex);
    }
  }

  loadNav()
  {
    try 
    {
      if(nav != undefined)
      {
        this.navLinks = nav;
      } 
    } catch (ex) 
    {
      console.log(ex);
    }
  }

}
