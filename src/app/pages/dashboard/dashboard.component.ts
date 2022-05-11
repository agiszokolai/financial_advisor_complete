import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { bottom, left } from '@popperjs/core';
import { ChartOptions, ChartType, Color } from 'chart.js';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { RecordsService } from 'src/app/services/htpp-services/records.service';
import { CommentsService } from 'src/app/services/htpp-services/comments.service';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { CommentType } from 'src/app/commons/models/comment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('alert') alert!: AlertComponent;

  categories: CategoriesType[] = [];
  records: RecordsType[] = [];
  expensesRecords: RecordsType[] = [];
  incomesRecords: RecordsType[] = [];

  comments: CommentType[] = [];

  amountIncomes: number = 0;
  amountExpenses: number = 0;

  editIsActive: boolean = false;
  editIsActive2: boolean = false;


  index: number = 0;
  index2: number = 0;
  index3: number = 0;

  expensesList: number[] = [1, 2, 3, 4, 5, 6, 9, 10];
  incomesLst: number[] = [7, 8];


  currentDate: Date = new Date();

  constructor(private recordsService: RecordsService, private categoryService: CategoriesService, private commentService: CommentsService) {
    this.getExpenses();
    this.getIncomes();
    this.getComments();
  }

  ngOnInit(): void {
  }

  getCategories() {
    this.index3 = 0;
    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
        this.categories.forEach(category => {
          if (this.expensesList.indexOf(parseInt(category.id + "")) !== -1) {
          }
        })
      }
    )
  }

  getExpenses() {
    this.expensesRecords = [];
    this.index = 0;

    this.recordsService.getRecordsByPeriod(formatDate(this.currentDate, 'y-MM', 'en')).subscribe(
      response => {
        this.records = response;
        this.records.forEach(record => {
          if (this.expensesList.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.expensesRecords[this.index] = record;
            this.index++;
          }
        });
      }
    )
  }

  getIncomes() {
    this.incomesRecords = [];
    this.index2 = 0;

    this.recordsService.getRecordsByPeriod(formatDate(this.currentDate, 'y-MM', 'en')).subscribe(
      response => {
        this.records = response;
        this.records.forEach(record => {
          if (this.incomesLst.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.incomesRecords[this.index2] = record;
            this.index2++;
          }
        });
      }
    )
  }

  setPeriod(event: any) {
    this.currentDate = event.target.value;
    this.getExpenses();
    this.getIncomes();
    this.getComments();
  }

  getComments() {
    this.commentService.getCommentsByPeriod(formatDate(this.currentDate, 'y-MM', 'en')).subscribe(
      response =>{
        this.comments = response;
      }
    )
  }

  getCommentsByType(type: string): CommentType[] {
    return type === "bevétel" ? this.comments.filter(c => this.incomesLst.indexOf(parseInt(c.categoryId + "")) !== -1) : this.comments.filter(c => this.expensesList.indexOf(parseInt(c.categoryId + "")) !== -1)
  }
}
