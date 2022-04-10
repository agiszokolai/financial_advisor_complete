import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { AuthService } from 'src/app/services/htpp-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (this.loginForm.valid) {

      let user = this.loginForm.getRawValue();
      user.password = sha512(user.password);

      this.authService.login(user).subscribe(
        response => {
          console.log("Test")
          localStorage.setItem("user", JSON.stringify(response));
          this.router.navigate(['../profile']);
        },
        error => {
          this.loginForm.get('username')?.setErrors({incorrect: true})
        }
      )
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });


  }

}
