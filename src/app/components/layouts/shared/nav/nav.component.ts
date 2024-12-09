import { Component } from '@angular/core';
import {nav} from '../../../../data/index'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  providers: [RouterLink]
})
export class NavComponent {
  
  constructor (_router : RouterLink){

  }
  
  navTitle:string = "DSY2205 Store";

  navLinks : any = nav;


  ngOnInit()
  {
    console.log("Cargando: app-nav ");
    this.loadNav();
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
