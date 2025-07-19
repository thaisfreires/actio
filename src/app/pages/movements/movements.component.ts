import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-movements',
  imports: [],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss'
})
export class MovementsComponent implements OnInit {
  movements: any[] = [];
  displayData: any[] = [];

  tableColumns = [
    { key: 'date', label: 'Date', align: 'start' },
    { key: 'type', label: 'Type', align: 'start' },
    { key: 'amount', label: 'Amount', align: 'end', format: this.formatAmount },
    { key: 'description', label: 'Description', align: 'start' }
  ];

  sortKey = '';
  sortDirection = 'asc';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  emptyRows = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchMovements();
  }

  fetchMovements() {
    this.accountService.getMovements().subscribe((data: any[]) => {
      this.movements = data;
      this.updateDisplayData();
    });
  }

  updateDisplayData() {
    let sorted = [...this.movements];

    if (this.sortKey) {
      sorted.sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];
        return this.sortDirection === 'asc'
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }

    this.totalPages = Math.ceil(sorted.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = sorted.slice(start, end);

    this.emptyRows = Array(this.pageSize - this.displayData.length).fill(null);
  }

  onSortKeyChange(_: any) {
    this.currentPage = 1;
    this.updateDisplayData();
  }

  onSortDirectionChange(_: any) {
    this.currentPage = 1;
    this.updateDisplayData();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }

  formatAmount(value: any): string {
    return `$${parseFloat(value).toFixed(2)}`;
  }

}
