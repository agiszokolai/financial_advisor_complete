import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-layout',
  template: '<div class="pt-1 pe-2 text-end"><span role="button" (click)="setHu()">hu</span> | <span role="button" (click)="setEn()">en</span></div><router-outlet></router-outlet>'
})
export class HomeLayoutComponent {

  constructor(public translate: TranslateService) { 
    translate.addLangs(['hu','en']); 
   }
 

   setHu(){
    this.translate.setDefaultLang("hu");
  }

  setEn(){
      this.translate.setDefaultLang("en");
  }
}
