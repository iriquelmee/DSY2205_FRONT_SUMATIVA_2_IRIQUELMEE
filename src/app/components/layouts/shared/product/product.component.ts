import { Component } from '@angular/core';
import { productos } from '../../../../data';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  productTitle : string = "Productos Mas Vendidos";

  dataProducts : any[] = [];

  ngOnInit()
  {
    console.log("Cargando: app-product");
    this.loadProduct();
  }

  loadProduct(){
    this.dataProducts = productos;
  }

}
