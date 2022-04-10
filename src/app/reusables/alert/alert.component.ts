import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-alert',
  template: '<ngx-alerts></ngx-alerts>'
})
export class AlertComponent {

  constructor(private alertService: AlertService) { }

  showDangerAlert(message: string) {
    this.alertService.danger(message);
  }

  showSuccessAlert(message: string) {
    this.alertService.success(message);
  }

  showInfoAlert(message: string) {
    this.alertService.info(message);
  }

  showWarningAlert(message: string) {
    this.alertService.warning(message);
  }

}
