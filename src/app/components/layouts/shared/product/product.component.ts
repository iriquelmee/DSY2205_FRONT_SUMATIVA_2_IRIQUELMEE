import { Component } from '@angular/core';
import { productos } from '../../../../data';
import { CartService } from '../../../../services/cart.service';
import { CartItem } from '../../../../interfaces/cart-item.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  addToCart(product: any){
    this.cartService.addItem(product);
    alert('¡Producto añadido al carrito con éxito!');
  }

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
