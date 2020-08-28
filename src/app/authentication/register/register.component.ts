import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private router: Router, private authSvc: RegisterService) {
    //validate form
    this.RegisterForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public isError = false;
  public msgError = '';

  ngOnInit(): void {
  }


  onRegister(): void {
    if (this.RegisterForm.valid) {
      this.authSvc.registerUser(this.RegisterForm.value).subscribe(user => {
        alert('User Registred');
        this.router.navigate(['/auth/login']);
      }, error => {
        console.error(error)
      });
    }
  }

  get username() { return this.RegisterForm.get('username'); }
  get password() { return this.RegisterForm.get('password'); }
  get role() { return this.RegisterForm.get('role'); }
}
