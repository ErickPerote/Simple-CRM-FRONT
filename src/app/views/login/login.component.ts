import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthenticationService, public route: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      try {
        let response = await this.authService.login(this.loginForm.value);
        this.authService.storeToken(response);
        this.route.navigate(["/dashboard"])
      } catch (error) {

      }
    }
  }


}
