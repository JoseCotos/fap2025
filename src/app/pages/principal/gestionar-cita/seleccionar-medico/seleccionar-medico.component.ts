import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';
import { CITA } from '../../../../constantes';

@Component({
  selector: 'app-seleccionar-medico',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, NgFor],
  templateUrl: './seleccionar-medico.component.html',
  styleUrl: './seleccionar-medico.component.css'
})
export class SeleccionarMedicoComponent {
  idMedico: string = '';
  nomMedico: string = '';
  idEspecialidad: string = '';
  nomEspecialidad: string = '';
  disponibleFecha: string = '';
  disponibledHora: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly ps: ProjectService
  ){}

  seleccionarEspecialidadForm = this.fb.group({
    selMedico: ["", [Validators.required]],
    selDisponibilidadFecha: ["", [Validators.required]],
    selDisponibilidadHora: ["", [Validators.required]]
  })
  
 
  btnAtraz(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/reservar-medico']);
  }

  btnContinuar(){
    if (this.idMedico && this.disponibleFecha && this.disponibledHora){
      sessionStorage.setItem(CITA.ID_MEDICO, this.idMedico);
      sessionStorage.setItem(CITA.NOMBRE_MEDICO, this.nomMedico);
      sessionStorage.setItem(CITA.FECHA, this.disponibleFecha);
      sessionStorage.setItem(CITA.HORA, this.disponibledHora);

      this.router.navigate(['/resumen-cita']);
    } else {
      alert('Seleccione un medico y/o Fecha y/o Horario')
    }
  }

  ngOnInit(): void {
    console.log(sessionStorage);
    const idEsp = sessionStorage.getItem(CITA.ID_ESPECIALIDAD);
    this.idEspecialidad = idEsp ? idEsp : '';
    const nomEsp = sessionStorage.getItem(CITA.NOMBRE_ESPECIALIDAD);
    this.nomEspecialidad = nomEsp ? nomEsp : ''

    this.__listar_medico_por_especialidad(this.idEspecialidad);
  }

  medicos: any = []

  __listar_medico_por_especialidad(idEspe: string){
    this.ps.listar_medico_por_especialidad(idEspe).subscribe((rest: any) => {
      this.medicos = rest.data
      console.log(this.medicos)
    })
  }

  getMedico(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.idMedico = objSelect.value;
    this.nomMedico = objSelect.options[objSelect.options.selectedIndex].label;

    this.__listar_disponibilidad_fecha(this.idMedico);
  }


  disponibilidad_fecha: any = []

  __listar_disponibilidad_fecha(idmedico: string){
    this.ps.listar_disponibilidad_fecha(idmedico).subscribe((rest: any) => {
      this.disponibilidad_fecha = rest.data
      console.log(this.disponibilidad_fecha)
    })
  }

  getDisponibilidadFecha(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.disponibleFecha = objSelect.value;

    console.log(this.idMedico);
    console.log(this.disponibleFecha);

    this.__listar_disponibilidad_hora(this.idMedico, this.disponibleFecha);
  }

  disponibilidad_hora: any = []

  __listar_disponibilidad_hora(idMedico: string, fecha: string){
    this.ps.listar_disponibilidad_hora(idMedico, fecha).subscribe((rest: any) => {
      this.disponibilidad_hora = rest.data
      console.log(this.disponibilidad_hora)
    })
  }  

  getDisponibilidadHora(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.disponibledHora = objSelect.value;
  }


}
