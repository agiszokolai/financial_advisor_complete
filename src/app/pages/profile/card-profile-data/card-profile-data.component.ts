import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserloggedInType } from 'src/app/commons/models/user';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { UserService } from 'src/app/services/htpp-services/user.service';

@Component({
  selector: 'app-card-profile-data',
  templateUrl: './card-profile-data.component.html',
  styleUrls: ['./card-profile-data.component.scss']
})
export class CardProfileDataComponent implements OnInit {

  @Input()
  user!: UserloggedInType;

  profileForm!: FormGroup;

  editIsActive: boolean = false;

  @ViewChild('alert') alert!: AlertComponent;

  constructor(private userService: UserService) { }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.put(this.user.id, this.profileForm.getRawValue()).subscribe(
        response => {
          this.user.email = response['email'];
          this.user.fullname = response['fullname'];
          this.user.username = response['username'];

          localStorage.setItem("user", JSON.stringify(this.user));

          this.alert.showSuccessAlert("A felhasználói adatok módosítása sikeresen megtörént!");
        },
        error => {
          this.alert.showDangerAlert("A felhasználói adatok módosítása sikertelen volt!");
        }
      )
    }
  }

  initFormGroup(): void {
    this.profileForm = new FormGroup({
      fullname: new FormControl(this.user.fullname, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
   this.initFormGroup();
  }
}
