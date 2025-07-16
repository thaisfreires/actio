import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss']
})
export class DefaultTableComponent {
  @Input() tableData: Record<string, any>[] = [];
  @Input() tableColumns: TableColumn[] = [];
  @Input() tableTitle = '';
  @Input() tableSubTitle = '';

  currentPage = 1;
  readonly pageSize = 5;

  get totalPages(): number {
    return Math.max(Math.ceil(this.tableData.length / this.pageSize), 1);
  }

  get displayData(): Record<string, any>[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tableData.slice(start, start + this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
