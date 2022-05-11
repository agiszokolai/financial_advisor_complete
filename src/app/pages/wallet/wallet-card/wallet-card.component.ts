import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss']
})
export class WalletCardComponent implements OnInit {

  @Input()
  category!: CategoriesType;

  @Input() set setCurrentDate(period: any) {
    this.currentDate = period;
  }

  @Input()
  amountSum!: number;

  @Input()
  title!: string;

  currentDate!: Date;

  @Input()
  record!: RecordsType;

  @Output()
  actionEmit = new EventEmitter<boolean>()

  setWidth(): string {
    
    if (this.record.amount === 0) return "0%";

    return Math.round((( this.record.amount / this.amountSum  ) * 100 )) + "%";
  }

  constructor() { }

  ngOnInit(): void {
  }
}
