import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-default-table',
  imports: [CommonModule],
  templateUrl: './default-table.component.html',
  styleUrl: './default-table.component.scss',
})
export class DefaultTableComponent {
  @Input() tableTitle: String = '';
  @Input() tableSubTitle: String = '';
  @Input() tableData: Array<Record<string, any>> = [];
  @Input() tableColumns: TableColumn[] = [];
  constructor() {}
}
export interface TableColumn {
  label: string;
  key?: string;
  align?: 'start' | 'center' | 'end';
  format?: (value: any, row?: any) => string;
  customRender?: (row: any) => any;
}
