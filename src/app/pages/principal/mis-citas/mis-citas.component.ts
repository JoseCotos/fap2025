import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})

export class MisCitasComponent {
  selectedPaciente: string = 'todas';
  filtro: string = 'todos';
  tab: string = 'proximas';
}
