import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { RecordsService } from 'src/app/services/htpp-services/records.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  categories?: CategoriesType[];
  records?: RecordsType[];
  categoryId: number = 1;
  
  constructor(private routet: Router, private categoryService: CategoriesService, private recordsService: RecordsService) {
  }

  ngOnInit(): void {
    this.getIncomes();
  }

  getIncomes() {
 
  }

}
