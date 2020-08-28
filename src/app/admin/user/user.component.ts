import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserService } from 'src/app/services/admin/register-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  getUserss;

  constructor(public formbuilder: FormBuilder, private registerUserservice: RegisterUserService) { }

  ngOnInit(): void {
    this.getUsers();
   }

  getUsers() {
    this.registerUserservice.getUser().subscribe(data => {
      this.getUserss = data;
    }, err => console.error(err)
    );
  }

}
