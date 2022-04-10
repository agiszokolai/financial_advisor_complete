import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesType } from 'src/app/commons/models/categories';
import { RecordsType } from 'src/app/commons/models/records';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { RecordsService } from 'src/app/services/htpp-services/records.service';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.scss']
})
export class WalletModalComponent implements OnInit {

  @ViewChild('alert') alert!: AlertComponent;

  @Input()
  category!: CategoriesType;

  @Input() set setCurrentDate(period: any) {
    this.currentDate = period;
    this.initForm();
  }

  currentDate!: Date;

  @Input()
  record!: RecordsType;

  @Output()
  actionEmit = new EventEmitter<boolean>();

  formGroup!: FormGroup;
  
  constructor(private recordservice: RecordsService) { }

  initForm(): void {
    this.formGroup = new FormGroup({
      amount: new FormControl(0, Validators.required),
      comment: new FormControl(null),
      period: new FormControl(this.currentDate),
      categoryId: new FormControl(this.category.id)
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.record.id == 0 ? this.createRecord() : this.editRecord();
  }

  createRecord() {
    this.recordservice.post(this.formGroup.getRawValue()).subscribe(
      response => {
        this.alert.showSuccessAlert("A költség rögzítése sikeresen megtörtént!");
        this.actionEmit.emit(true);
        this.initForm();
        this.record = response
      },
      error =>  {
        this.alert.showDangerAlert("A költség rögzítése sikertelen volt!")
        this.initForm();
      }
    )
  }

  editRecord() {
    let amount = parseInt(this.record.amount + "") + this.formGroup.get('amount')?.value;

    let record: RecordsType = this.formGroup.getRawValue();
    record.amount = amount > 0 ? amount : 0;

    this.recordservice.put(this.record.id, record).subscribe(
      response => {
        this.alert.showSuccessAlert("A költség rögzítése sikeresen megtörtént!");
        this.actionEmit.emit(true);
        this.initForm();
        this.record = response
        console.log(response)
      },
      error =>  {
        this.alert.showDangerAlert("A költség rögzítése sikertelen volt!")
        this.initForm();
      }
    )
  }

}
