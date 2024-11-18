import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

  ngOnInit(): void {
    console.log("app-acordion cargado");
  }
  @Input() accordionItems!: any[] | undefined;

  loadAcordion()
  {
    this.accordionItems! = [];
  }

  toggleAccordion(item: any){
    item.show = !item.show;
  }

}
