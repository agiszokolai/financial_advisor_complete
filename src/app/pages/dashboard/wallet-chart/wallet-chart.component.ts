import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { RecordsType } from 'src/app/commons/models/records';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { RecordsService } from 'src/app/services/htpp-services/records.service';

@Component({
  selector: 'app-wallet-chart',
  templateUrl: './wallet-chart.component.html',
  styleUrls: ['./wallet-chart.component.scss']
})
export class WalletChartComponent implements OnInit {

  @Input()
  amountExpenses!: number;

  @Input()
  amountIncomes!: number;
  
  @Input()
  records: RecordsType[] = [];

  @Input()
  expensesList: number[] = [1, 2, 3, 4, 5, 6, 9, 10];

  @Input()
  incomesLst: number[] = [7, 8];

  currentDate: Date = new Date();

  @Input() set setCurrentDate(period: any) {
    this.currentDate = period;
  }

  constructor(private recordsService: RecordsService,  private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getAmount();
  }

  setPeriod(event: any) {
    this.currentDate = event.target.value;
    this.getAmount();
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
