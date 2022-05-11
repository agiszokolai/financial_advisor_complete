import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public translate: TranslateService) { 
   translate.addLangs(['hu','en']); 
  }

   switchLanguage(lang: string){
    this.translate.setDefaultLang(lang);
    console.log(lang);
  }

  ngOnInit(): void {
  }

}
