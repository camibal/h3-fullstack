import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { adminUser } from 'src/app/interface/admin/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private endpoint: string = environment.endpoint + '/users';

  constructor(private httpClient: HttpClient) { }

  getUser() {
    return this.httpClient.get(this.endpoint);
  }

  saveUser(UserForm: adminUser) {
    return this.httpClient.post(this.endpoint, UserForm);
  }

  deleteUser(id) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  updateUser(id: string | number, updatedCities: adminUser) {
    return this.httpClient.put(`${this.endpoint}/${id}`, updatedCities);
  }
}
