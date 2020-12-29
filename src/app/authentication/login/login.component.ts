import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  @ViewChild('form', {}) loginForm!: NgForm;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      isAdmin: false
    }).subscribe((response) => {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      })
    }, (error) => {
      this.loginForm.reset();
      this.errorMessage = 'Gebruiker niet gevonden';
    });
  }
}
