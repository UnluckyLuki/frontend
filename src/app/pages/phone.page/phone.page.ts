import {Component, ElementRef, ViewChild} from '@angular/core';
import {Phone} from '../../models/Phone';
import {PhoneService} from '../../services/phone.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-phone.page',
  imports: [
    FormsModule
  ],
  templateUrl: './phone.page.html',
  styleUrl: './phone.page.css'
})
export class PhonePage {

  phones: Phone[] = [];
  phone: Phone = {phoneId: 0, phoneNumber: '', phoneName: ''};
  ePhone: Phone = {phoneId: 0, phoneNumber: '', phoneName: ''};
  @ViewChild('editModal') editModal : ElementRef | undefined;

  constructor(private service: PhoneService) {
  }

  ngOnInit() {
    this.getAllPhones();
  }

  getAllPhones() {
    this.service.getAll()
      .subscribe(data => this.phones = data);
  }

  addPhone() {
    this.service.create(this.phone)
      .subscribe(() => this.getAllPhones());
  }

  openModal(phone: Phone){
    if(this.editModal){
      this.ePhone = {...phone};
      this.editModal.nativeElement.style.display = 'block';
    }
  }

  closeModal(){
    if(this.editModal){
      this.editModal.nativeElement.style.display = 'none';
    }
  }

  editPhone() {
    this.service.update(this.ePhone.phoneId, this.ePhone)
      .subscribe(() => this.getAllPhones());
  }

  deletePhone(id: number) {
    const isDelete = confirm('Are you sure you want to delete this phone?');
    if(isDelete){
      this.service.delete(id)
        .subscribe(() => this.getAllPhones());
    }
  }
}
