import { Component, OnInit, Input } from '@angular/core';
import { adminUser } from 'src/app/interface/admin/user';
import { RegisterUserService } from 'src/app/services/admin/register-user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user: adminUser = {
    id: 12345,
    tid: '',
    name: '',
    email: ''
  }

  constructor(private registerUserservice: RegisterUserService) { }

  ngOnInit(): void {
    console.log(this.user.id)    
  }

  deleteUser() {
    this.registerUserservice.deleteUser(this.user.id).subscribe(res => {
      alert('Usuario eliminado');
      // this.send.emit(this.cities);
    }, err => console.error(err)
    )
  }

}
