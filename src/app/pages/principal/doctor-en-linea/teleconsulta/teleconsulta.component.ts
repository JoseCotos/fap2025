import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teleconsulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teleconsulta.component.html',
  styleUrls: ['./teleconsulta.component.css']
})
export class TeleconsultaComponent {
  pasoActual = 1; // Cambia a 2 o 3 cuando el usuario avance
  aceptaTerminos = false;

  preguntas = [
    { texto: '¿Quieres contarnos algo más de tus síntomas?' },
    { texto: '¿Tiene alguna alergia que desee informar?' },
    { texto: '¿Se encuentra tomando alguna medicación?', detalle: 'Cuéntanos si el paciente está tomando algún tipo de medicación para tenerlo en cuenta.' },
    { texto: '¿Ha recibido atención médica o tratamiento en las últimas 24 hs?' }
  ];
}

