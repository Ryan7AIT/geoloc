import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginMessage: string = '';
  loginMessageClass: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.message === 'Login successful') {
        this.loginMessage = 'Login successful';
        this.loginMessageClass = 'text-green-500';
        this.router.navigate(['/bi']);
      } else {
        this.loginMessage = 'Invalid username or password';
        this.loginMessageClass = 'text-red-500';
        // alert('Invalid username or password');
      }
    });
  }
}