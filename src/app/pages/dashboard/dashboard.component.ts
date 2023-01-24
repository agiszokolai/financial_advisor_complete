import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { RecordsService } from 'src/app/services/htpp-services/records.service';
import { CommentsService } from 'src/app/services/htpp-services/comments.service';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { CommentType } from 'src/app/commons/models/comment';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


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
  categoryNameIncomes: string[] = [];
  categoryNameExpenses: string[] = [];

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
    this.getAmount();
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories() {
    this.index3 = 0;
    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
        this.categories.forEach(category => {
          if (this.expensesList.indexOf(category.id ) > 0) {
              this.categories[this.index3] = category;
          }
        })
      }
    )
    return this.categories;
  }

  getCategoryNameForIncomes(){
   const index = 0;
   this.comments.forEach(element => {
      this.categoryService.getById(element.categoryId).subscribe(
        response => {
          this.categoryNameIncomes[index] = response.name;
        }
      )
     
   });
   console.log("incomescategory:", this.categoryNameIncomes);
  }

  getCategoryNameForExpenses(){
    const index = 0;
    this.comments.forEach(element => {
     
       this.categoryService.getById(element.categoryId).subscribe(
         response => {
           this.categoryNameExpenses[index] = response.name;
         }
       )
      
    });
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
    this.getAmount();
    this.getCategories();
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

  
  getAmount() {
    this.amountExpenses = 0;
    this.amountIncomes = 0;

    this.recordsService.getRecordsByPeriod(formatDate(this.currentDate, 'y-MM', 'en')).subscribe(
      response => {
        this.records = response;
        this.records.forEach(record => {
          if (this.expensesList.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.amountExpenses += parseInt(record.amount + "");
          }
          if (this.incomesLst.indexOf(parseInt(record.categoryId + "")) !== -1) {
            this.amountIncomes += parseInt(record.amount + "");
          }
        });
        console.log(this.currentDate);
        console.log(this.amountExpenses);
        console.log(this.amountIncomes);
        this.barChartData = [
          { data: [this.amountExpenses], 
            label: 'Kiadás',
            backgroundColor: "rgb(255,0,0)", 
            hoverBackgroundColor: "rgba(255,0,0,0.7" },
          { data: [this.amountIncomes], 
            label: 'Bevétel', 
            backgroundColor: "rgb(0,255,0)",
            hoverBackgroundColor: "rgb(0,128,0,0.7)" },
        ]
        this.pieChartData = [
          { data: [this.amountExpenses, this.amountIncomes], 
            backgroundColor: ["rgb(255,0,0)", "rgb(0,255,0)"],
            hoverBackgroundColor: ["rgba(255,0,0,0.7",  "rgb(0,128,0,0.7)"],
            borderColor:  ["rgb(255,0,0)", "rgb(0,255,0)"],
            hoverBorderColor: ["rgba(255,0,0,0.7",  "rgb(0,128,0,0.7)"],
          }
        ]
      }
    )
  }

  /* Bar chart */
  barChartLabels: any[] = ['Kiadás és bevétel'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [DatalabelsPlugin];
  barChartData: any[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: {
        grid: {
          color: '#black'
        },
        
      }
    },
    plugins:{
      title: {
        text: "Kiadás és bevétel akalakulása (az adatok forintban értendőek)",
        display: true,
        font: {
          size: 14,
          
        }
      },
      datalabels:{
        color: 'black',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    }
    
  };

  /* Pie chart */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins:{
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: 'black',
        font: {
          size: 16,
          weight: 'bold'
        }
    },
      title: {
        text: 'Kiadás és bevétel alakulása százalékos megjelenítéssel',
        display: true,
        font: {
          size: 14
        }
      },
      
    },
    
  };
  pieChartLabels: any[] = [['Kiadás'], ['Bevétel']];
  pieChartData: any[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [DatalabelsPlugin];
}


