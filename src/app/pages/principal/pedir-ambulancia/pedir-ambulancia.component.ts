import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ NECESARIO

@Component({
  standalone: true, // ✅ IMPORTANTE
  selector: 'app-pedir-ambulancia',
  templateUrl: './pedir-ambulancia.component.html',
  styleUrls: ['./pedir-ambulancia.component.css'],
  imports: [CommonModule], // ✅ HABILITA *ngIf
})
export class PedirAmbulanciaComponent {
  mostrarModal = true;

  constructor(private router: Router) {}

  cerrarModal() {
    this.mostrarModal = false;
    this.router.navigate(['/principal']);
  }
}
