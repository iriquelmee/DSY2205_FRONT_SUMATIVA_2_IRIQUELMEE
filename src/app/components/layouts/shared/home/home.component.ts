import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  homeTitle: string = "Bienvenido a tu Multitienda On-Line Preferida";

}
