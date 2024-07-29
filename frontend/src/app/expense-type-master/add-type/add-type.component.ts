// src/app/add-type/add-type.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeMasterService } from '../type-master.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  taskName: string = '';
  isModalOpen: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private typeMasterService: TypeMasterService) { }

  ngOnInit() {}

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/expense-type-master']);
  }

  saveTask() {
    if (this.taskName) {
      this.typeMasterService.addType(this.taskName).subscribe(
        () => {
          this.closeModal();
          alert('Type saved successfully!');
        },
        (error) => {
          if (error.status === 400 && error.error.msg === 'Type already exists') {
            this.errorMessage = 'This type already exists. Please add a different type.';
          } else {
            console.error('Error adding type:', error);
            alert('Error saving type. Please try again.');
          }
        }
      );
    } else {
      alert('Please enter a type name.');
    }
  }
}