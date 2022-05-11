import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  
  
  constructor(public translate: TranslateService) { 
    translate.addLangs(['hu','en']); 
   }
 
   ngOnInit(): void {
  }
  
  setHu(){
    this.translate.setDefaultLang("hu");
  }

  setEn(){
      this.translate.setDefaultLang("en");
  }
}

