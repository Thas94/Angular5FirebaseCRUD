import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.getData();
  }

  onSubmit(employeeForm: NgForm) {
        this.service.insertEmployee(employeeForm.value);
       this.toastr.success('Registered Successfully', 'Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null) {
    employeeForm.reset();
    }
    this.service.selectedEmployee = {
      $key : null,
      name : '',
      position : '',
      office : '',
      salary : 0
      };
  }

  update(employeeForm: NgForm) {
    this.service.updateEmployee(employeeForm.value);
    this.toastr.success('Updated Successfully', 'Employee Update');
    this.resetForm(employeeForm);
  }

}
