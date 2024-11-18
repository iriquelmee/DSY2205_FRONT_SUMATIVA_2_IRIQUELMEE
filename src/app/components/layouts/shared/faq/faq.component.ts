import { Component, OnInit } from '@angular/core';
import { accordion } from '../../../../data';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  title:string="";
  accordionItems: any[] | undefined;

  ngOnInit(){
    this.loadFaqs();
  }

  loadFaqs(){
    this.title=accordion.title;
    this.accordionItems =  accordion.faqs;
  }
}
