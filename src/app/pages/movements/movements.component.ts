import { Component, OnInit } from '@angular/core';
import { Movement } from '../../models/movement.model';
import { MovementService } from '../../services/movement.service';
import { DefaultTableComponent, TableColumn } from '../../components/default-table/default-table.component';

@Component({
  selector: 'app-movements',
  imports: [DefaultTableComponent],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss'
})
export class MovementsComponent implements OnInit {

  movements: Movement[] = [];

  tableColumns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      align: 'center',
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'end',
      format: (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`,
    },
    {
      key: 'type',
      label: 'Type',
      align: 'center',
      format: (value: string) => 
        `<span class="badge bg-${value === 'DEPOSIT' ? 'success' : 'danger'}">${value}</span>`,
    },
    {

      key: 'dateTime',
      label: 'Date',
      align: 'center',
      format: (value: string) => value,

    },
  ];

  constructor(private movementService: MovementService) {}

  ngOnInit(): void {
    this.movementService.getMovements().subscribe({
      next: (data) => (this.movements = data),
      error: (err) => console.error('Error loading movements', err),
    });
  }

}