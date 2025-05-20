import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CITA } from '../../../../constantes';


@Component({
  selector: 'app-resumen-cita',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './resumen-cita.component.html',
  styleUrl: './resumen-cita.component.css'
})
export class ResumenCitaComponent {
  nomMedico: string = '';
  nomEspecialidad: string = '';
  disponibleFecha: string = '';
  disponibleHora: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    const nMed = sessionStorage.getItem(CITA.NOMBRE_MEDICO);
    const nEsp = sessionStorage.getItem(CITA.NOMBRE_ESPECIALIDAD);
    const dFec = sessionStorage.getItem(CITA.FECHA);
    const dHor = sessionStorage.getItem(CITA.HORA);

    this.nomMedico = nMed ? nMed : '';
    this.nomEspecialidad = nEsp ? nEsp : '';
    this.disponibleFecha = dFec ? dFec : '';
    this.disponibleHora = dHor ? dHor : '';

    console.log(sessionStorage);
  }

  seleccionarEspecialidadForm = this.fb.group({
    tipoDoc: ["", [Validators.required]]
  })
  
 
  btnAtraz(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/seleccionar-especialidad']);
  }

  btnContinuar(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/mensaje-confirmacion-cita']);
  }

}
