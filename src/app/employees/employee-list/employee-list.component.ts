import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Employee} from '../shared/employee.model';
import { element } from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  id: any;

  constructor(private service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {

    const x = this.service.getData();
    x.snapshotChanges().subscribe(item => {
      this.list = [];
      // tslint:disable-next-line:no-shadowed-variable
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.list.push(y as Employee);
      });
    });
  }

  edit(emp: Employee) {
    this.service.selectedEmployee =  Object.assign({}, emp);
    this.id = emp.$key;
    localStorage.setItem('id', this.id);
  }

  delete(key: string) {
    if (confirm('Are you sure to delete this record?') === true) {
    this.service.deleteEmployee(key);
    this.toastr.warning('Deleted Successfully', 'Employee Register');
    }
  }

}
