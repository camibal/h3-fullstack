import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterUserService } from 'src/app/services/admin/register-user.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {
  UserForm: FormGroup;

  constructor(public formbuilder: FormBuilder, private registerUserservice: RegisterUserService) {
    //validate form
    this.UserForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      tid: ['', [Validators.required, Validators.minLength(3)]],
      id: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  onUser() {
    console.log(this.UserForm.value);
    this.registerUserservice.saveUser(this.UserForm.value).subscribe(data => {
      alert('usuario guardado')
    }, error => {
      console.error(error)
    });
  }

}
