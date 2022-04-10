import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { RecordsService } from 'src/app/services/htpp-services/records.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  categories: CategoriesType[] = [];
  records: RecordsType[] = [];

  amountSum: number = 0;

  currentDate: Date = new Date();

  currentSite: string = "költség";

  title: string = "Kiadások";

  expensesList: number[] = [1, 2, 3, 4, 5, 6, 9];
  incomesLst: number[] = [7, 8];

  constructor(private categoryService: CategoriesService, private recordsService: RecordsService, private router: Router) {
    if (this.router.url.includes('incomes')) {
      this.currentSite = "bevétel";
      this.title = "Bevételek";
    }

    this.getCategories();
    this.getRecords();
  }

  ngOnInit(): void {
    
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response.filter(category => category.type == this.currentSite);
      }
    )
  }

  getRecords() {
    this.amountSum = 0;

    this.recordsService.getRecordsByPeriod(formatDate(this.currentDate, 'y-MM', 'en')).subscribe(
      response => {
        this.records = response;
        this.records.forEach(record => {

          if (this.currentSite == "költség" && this.expensesList.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.amountSum += parseInt(record.amount + "");
          }

          if (this.currentSite == "bevétel" && this.incomesLst.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.amountSum += parseInt(record.amount + "");
          }
        });

        console.log(this.amountSum)
      }
    )
  }

  getRecordByCategoryId(categoryId: number): RecordsType {
    let record = this.records.find(record => record.categoryId == categoryId)!;

    return record ? record : {id: 0, categoryId: categoryId, amount: 0, comment: "", period: formatDate(this.currentDate, 'y-MM', 'en')};
  }

  setPeriod(event: any) {
    this.currentDate = event.target.value;
    this.getRecords();
  }
}
