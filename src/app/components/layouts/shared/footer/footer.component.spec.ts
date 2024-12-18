import { ComponentFixture, TestBed } from '@angular/core/testing';
import { nav } from '../../../../data/index';
import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate navLinks with data from nav', () => {
    component.loadNav();
    expect(component.footerItems).toEqual(nav);
  });

});
