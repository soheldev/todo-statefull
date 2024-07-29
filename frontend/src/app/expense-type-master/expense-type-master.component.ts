import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewModalComponent } from '../view-modal/view-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { TypeMasterService } from './type-master.service';

interface Type {
  _id: string;
  type: string;
  createdAt?: Date;
}

@Component({
  selector: 'app-expense-type-master',
  templateUrl: './expense-type-master.component.html',
  styleUrls: ['./expense-type-master.component.css'],
})
export class ExpenseTypeMasterComponent implements OnInit {
  typeMaster: Type[] = [];
  paginatedData: Type[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  searchTerm: string = ''; // Add search term property

  constructor(
    public dialog: MatDialog,
    private typeMasterService: TypeMasterService
  ) {}

  ngOnInit() {
    this.loadTypeMaster();
  }

  loadTypeMaster() {
    this.typeMasterService.getTypes().subscribe(
      (types: Type[]) => {
        // No need to sort again since the backend is already sorting
        this.typeMaster = types;
        this.totalPages = Math.ceil(this.typeMaster.length / this.itemsPerPage);
        this.updatePaginatedData();
      },
      (error: any) => {
        console.error('Error loading types:', error);
      }
    );
  }
  

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.typeMaster.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedData();
  }

  deleteType(id: string) {
    this.typeMasterService.deleteType(id).subscribe(
      () => {
        this.typeMaster = this.typeMaster.filter((type) => type._id !== id);
        this.totalPages = Math.ceil(this.typeMaster.length / this.itemsPerPage);
        this.updatePaginatedData();
      },
      (error: any) => {
        console.error('Error deleting type:', error);
      }
    );
  }

  viewType(index: number) {
    const dialogRef = this.dialog.open(ViewModalComponent, {
      data: this.paginatedData[index],
    });
  }

  editType(type: Type) {
    console.log('Editing type:', type);
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: { ...type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.typeMasterService.updateType(result._id, result).subscribe(
          (updatedType: Type) => {
            console.log('Updated type:', updatedType);
            const index = this.typeMaster.findIndex(t => t._id === updatedType._id);
            if (index !== -1) {
              this.typeMaster[index] = updatedType;
              this.totalPages = Math.ceil(this.typeMaster.length / this.itemsPerPage);
              this.updatePaginatedData(); // Update paginated data after edit
            }
          },
          (error: any) => {
            console.error('Error updating type:', error);
            if (error.status === 401) {
              console.log('User is not authorized. Redirecting to login...');
            }
          }
        );
      }
    });
  }

  filterTypes() {
    if (!this.searchTerm) {
      this.totalPages = Math.ceil(this.typeMaster.length / this.itemsPerPage);
      this.updatePaginatedData();
      return;
    }

    const filteredTypes = this.typeMaster.filter((type) =>
      type.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filteredTypes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = filteredTypes.slice(startIndex, endIndex);
  }
}
