import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  label: string;
  key?: string;
  align?: 'start' | 'center' | 'end';
  format?: (value: any, row?: any) => string;
  customRender?: (row: any) => any;
}

@Component({
  selector: 'app-default-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss']
})
export class DefaultTableComponent {
  @Input() tableTitle = '';
  @Input() tableSubTitle = '';
  @Input() tableColumns: TableColumn[] = [];
  @Input() tableData: Record<string, any>[] = [];

  currentPage = 1;
  readonly pageSize = 5;

  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages(): number {
    return Math.max(Math.ceil(this.sortedData.length / this.pageSize), 1);
  }

  get sortedData(): Record<string, any>[] {
    const data = [...this.tableData];
    if (!this.sortKey) return data;

    return data.sort((a, b) => {
      const aVal = a[this.sortKey];
      const bVal = b[this.sortKey];

      if (aVal == null && bVal != null) return -1;
      if (bVal == null && aVal != null) return 1;

      if (typeof aVal === 'string') {
        const cmp = aVal.localeCompare(bVal);
        return this.sortDirection === 'asc' ? cmp : -cmp;
      }

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });



  }

  get displayData(): Record<string, any>[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  onSortKeyChange(key: string) {
    this.sortKey = key;
    this.currentPage = 1;
  }

  onSortDirectionChange(dir: 'asc' | 'desc') {
    this.sortDirection = dir;
    this.currentPage = 1;
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  get emptyRows(): any[] {
    const missing = this.pageSize - this.displayData.length;
    return Array(Math.max(missing, 0)).fill(null);
  }
}
