import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showLoginForm: Boolean;
  private fName: string;
  private lName: string;
  private username: string;
  private password: string;
  private postStream$: Subscription;


  constructor(private _authService: AuthService) {
    this.showLoginForm = true;
  }
  ngOnInit(): void {

  }

  showCreateAccount() {
    this.showLoginForm = (!this.showLoginForm);
  }

  login() {
    if (this.postStream$) { this.postStream$.unsubscribe }

    this.postStream$ = this._authService.login(this.username, this.password).subscribe(result => {
      if (result.state == 1) {
        debugger
        // this._router.navigate(["home"]);
        console.log('yey')
      } else {
        alert(result.msg);
      }
    })
  }

  register() {
    if (this.postStream$) { this.postStream$.unsubscribe }
    this.postStream$ = this._authService.register(this.fName, this.lName, this.username, this.password).subscribe(res => {
      debugger;
    })
  }


}
