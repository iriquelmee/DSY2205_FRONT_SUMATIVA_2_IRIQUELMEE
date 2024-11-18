import { Component } from '@angular/core';
import { BodyComponent } from './components/layouts/shared/body/body.component';
import { NavComponent } from './components/layouts/shared/nav/nav.component';
import { FooterComponent } from './components/layouts/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, BodyComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'dsy2205-store';
}
