import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sha512 } from 'js-sha512';
import { UserloggedInType } from 'src/app/commons/models/user';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { UserService } from 'src/app/services/htpp-services/user.service';

@Component({
  selector: 'app-card-password',
  templateUrl: './card-password.component.html',
  styleUrls: ['./card-password.component.scss']
})
export class CardPasswordComponent implements OnInit {

  @Input()
  user!: UserloggedInType;

  passwordForm!: FormGroup;

  editIsActive: boolean = false;

  @ViewChild('alert') alert!: AlertComponent;

  constructor(private userService: UserService) { }

  initForm(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      new_password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      confirm_pass: new FormControl(null, [Validators.required, this.samePasswordValidators.bind(this)]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  samePasswordValidators(control: FormControl): { [s: string]: boolean } | null {
    return this.passwordForm !== undefined && this.passwordForm.get('new_password')!.value === control.value
      ? null
      : { notSamePassword: true }
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      let user = this.passwordForm.getRawValue();

      user.password = sha512(user.password);
      user.new_password = sha512(user.new_password);
      user.confirm_pass = sha512(user.confirm_pass);
      
      this.userService.put(this.user.id, user).subscribe(
        response => {
          this.alert.showSuccessAlert("A jelszó módisítása sikeresen megtörtént!");
        }, error => {
          this.alert.showDangerAlert("A jelszó módisítása sikertelen volt!");
        }
      )
    }
  }

}
