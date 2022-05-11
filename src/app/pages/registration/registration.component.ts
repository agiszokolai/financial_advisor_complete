import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sha512 } from 'js-sha512';
import { UserType } from 'src/app/commons/models/user';
import { UserService } from 'src/app/services/htpp-services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup; //!-el jelezve hogy nem undefined

  constructor(private userService: UserService) { 
  }

  onSubmit(): void {
    let user: UserType = this.registerForm.getRawValue();
    user.password = sha512(this.registerForm.get('password')?.value)

    this.userService.post(user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log("Error", error);

        if ("username" in error.error) {
          this.registerForm.get("username")?.setErrors({"exist": true});
        }

        if ("email" in error.error) {
          this.registerForm.get("email")?.setErrors({"exist": true});
        }
      }
    )
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      confirm_pass: new FormControl(null, [Validators.required, this.samePasswordValidators.bind(this)]),
      gdpr: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  // TODO: JELSZÓ VALIDATORS SZÁM-NAGYBETŰ SZÉTSZEDÉSE
  samePasswordValidators(control: FormControl): { [s: string] : boolean } | null {
    return this.registerForm !== undefined && this.registerForm.get('password')!.value === control.value
      ? null
      : { notSamePassword: true }
  }


}
