import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-mensaje-confirmacion-cita',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './mensaje-confirmacion-cita.component.html',
  styleUrl: './mensaje-confirmacion-cita.component.css'
})
export class MensajeConfirmacionCitaComponent {

}
