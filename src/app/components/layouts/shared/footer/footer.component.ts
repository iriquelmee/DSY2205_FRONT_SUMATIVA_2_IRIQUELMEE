import { Component } from '@angular/core';
import {nav} from '../../../../data/index';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  footerTitle:string = "DSY2205 Store - By Ignacio Riquelme."
  footerItems : any[]  | undefined;

  ngOnInit()
  {
    console.log("Cargando: app-footer");
    this.loadNav();
  }

  loadNav()
  {
    try 
    {
      if(nav != undefined)
      {
        this.footerItems = nav;
      } 
    } catch (ex) 
    {
      console.log(ex);
    }
  }

}
