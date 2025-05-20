import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-en-linea',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-en-linea.component.html',
  styleUrls: ['./doctor-en-linea.component.css']
})
export class DoctorEnLineaComponent {}
