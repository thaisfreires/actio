import { Component, OnInit } from '@angular/core';
import { Movement, MovementResponse } from '../../models/movement.model';
import { MovementService } from '../../services/movement.service';
import { DefaultTableComponent } from '../../components/default-table/default-table.component';

@Component({
  selector: 'app-movements',
  imports: [DefaultTableComponent],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss'
})
export class MovementsComponent implements OnInit {

  movements: Movement[] = [];
  displayData: Movement[] = [];
  tableColumns: any[] = [];

  sortKey = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  emptyRows: any[] = [];

  constructor(private movementService: MovementService) {}
  
  ngOnInit(): void {
    this.tableColumns = [
      { label: 'ID', key: 'id' },
      { label: 'Amount', key: 'amount' },
      { label: 'Type', key: 'type' },
      { label: 'Date & Time', key: 'dateTime', format: this.formatDate }
    ];
    this.fetchMovements();
  }
  fetchMovements(): void {
    this.movementService.getMovements().subscribe({
      next: (data) => {
        this.movements = data;
        this.sortAndPaginate();
      },
      error: (err) => console.error('Failed to load movements', err)
    });
  }
  formatDate = (value: string) => {
    return new Date(value).toLocaleString();
  };

  sortAndPaginate(): void {
    let data = [...this.movements];

    if (this.sortKey) {
      data.sort((a, b) => {
        const valA = (a as any)[this.sortKey];
        const valB = (b as any)[this.sortKey];
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.totalPages = Math.ceil(data.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = data.slice(start, end);

    const remaining = this.pageSize - this.displayData.length;
    this.emptyRows = Array(remaining).fill({});
  }

  onSortKeyChange(): void {
    this.currentPage = 1;
    this.sortAndPaginate();
  }

  onSortDirectionChange(): void {
    this.currentPage = 1;
    this.sortAndPaginate();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.sortAndPaginate();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.sortAndPaginate();
    }
  }

}
