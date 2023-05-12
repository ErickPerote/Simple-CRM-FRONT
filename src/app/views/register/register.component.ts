import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  emailIsValid: boolean = false
  email: boolean = false

  constructor(
    private registerService: RegisterService,
    private authService: AuthenticationService,
    public route: Router
    ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if(this.registerForm.valid){
      try {
        let response = await this.registerService.createUser(this.registerForm.value)
        this.authService.storeToken(response);
        this.route.navigate(['/dashboard/home'])
      } catch(error) {
        console.log(error)
      }
      
    }if(!this.registerForm.valid){
      this.emailIsValid = true
    }
  }
}




