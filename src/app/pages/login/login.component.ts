import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['charles@email.com', [Validators.required, Validators.email]],
      senha: ['@Charles3618', [Validators.required]],
    });
  }

  get dadosForm() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.loginService
      .login(this.dadosForm['email'].value, this.dadosForm['senha'].value)
      .subscribe({
        next: (token) => {
          alert(token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Ocorreu um erro');
        },
      });
  }
}
