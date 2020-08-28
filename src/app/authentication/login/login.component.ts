import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    //validate form
    this.LoginForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    const formValue = this.LoginForm.value;
    this.loginService.login(formValue).subscribe(res => {
      if (res) {
        alert('is logged')
        this.router.navigate(['/admin']);
      }
    })
  }

}
