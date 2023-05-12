import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: "app-navbar",
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }


  logout() {
    this.authService.logout()
    this.route.navigate([""])
  }
}
