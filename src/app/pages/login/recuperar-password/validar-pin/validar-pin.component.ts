import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE: FormsModule
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-validar-pin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './validar-pin.component.html',
  styleUrl: './validar-pin.component.css'
})
export class ValidarPinComponent implements OnInit {
  codigo: string = ''; // <-- ESTA ES LA VARIABLE QUE FALTABA
  tiempoRestante: string = '03:00';
  segundos: number = 180;
  intervalo: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  iniciarTemporizador(): void {
    this.intervalo = setInterval(() => {
      this.segundos--;
      const min = Math.floor(this.segundos / 60).toString().padStart(2, '0');
      const seg = (this.segundos % 60).toString().padStart(2, '0');
      this.tiempoRestante = `${min}:${seg}`;
      if (this.segundos <= 0) {
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  reenviarPin(): void {
    alert('PIN reenviado.');
    this.segundos = 180;
    this.iniciarTemporizador();
  }

  cancelar(): void {
    this.router.navigate(['/login']);
  }

  validar(): void {
    if (this.codigo.length === 6) {
      this.router.navigate(['/cambiar-password']);
    }
  }
}
