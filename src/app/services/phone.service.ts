import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Phone} from '../models/Phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private apiUrl = 'https://localhost:5001/api/Phone';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl);
  }

  create(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.apiUrl, phone);
  }

  update(id: number, phone: Phone): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, phone);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
