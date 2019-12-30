import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: String; 
    password: String;
    loginError: String = '';
    
    constructor(private router:Router) { }
    
    ngOnInit() {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (!!loggedInStatus) {
            this.router.navigate(['dashboard']);
        }
    }
    
    onLoginSubmit() : void {
        // reset error message
        this.loginError = '';

        // validate login input
        if (this.username === 'demo' && this.password === 'demo') {
            // save loggedIn state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            // navigate to dashbaord
            this.router.navigate(['dashboard']);
        } else {
            this.loginError = 'Invalid username or password';
        }
    }
}
