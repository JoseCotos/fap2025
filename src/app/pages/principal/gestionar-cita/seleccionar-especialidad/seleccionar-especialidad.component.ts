import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';
import { CITA } from '../../../../constantes';


@Component({
  selector: 'app-seleccionar-especialidad',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, NgFor],
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrl: './seleccionar-especialidad.component.css'
})
export class SeleccionarEspecialidadComponent {
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
    selEspecialidad: ["", [Validators.required]],
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
    if (this.idEspecialidad && this.disponibleFecha && this.disponibledHora){
      sessionStorage.setItem(CITA.ID_ESPECIALIDAD, this.idEspecialidad);
      sessionStorage.setItem(CITA.NOMBRE_ESPECIALIDAD, this.nomEspecialidad);
      sessionStorage.setItem(CITA.FECHA, this.disponibleFecha);
      sessionStorage.setItem(CITA.HORA, this.disponibledHora);

      this.router.navigate(['/resumen-cita']);
    } else {
      alert('Seleccione una especialidad y/o Fecha y/o Horario')
    }
  }

  ngOnInit(): void {
    console.log(sessionStorage);
    const idMed = sessionStorage.getItem(CITA.ID_MEDICO);
    this.idMedico = idMed ? idMed : '';
    const nomMed = sessionStorage.getItem(CITA.NOMBRE_MEDICO);
    this.nomMedico = nomMed ? nomMed : ''

    this.__listar_especialidad_por_medico(this.idMedico);
  }

  especialidades: any = []

  __listar_especialidad_por_medico(idmedico: string){
    this.ps.listar_especialidad_por_medico(idmedico).subscribe((rest: any) => {
      this.especialidades = rest.data
      console.log(this.especialidades)
    })
  }

  getEspecialidad(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.idEspecialidad = objSelect.value;
    this.nomEspecialidad = objSelect.options[objSelect.options.selectedIndex].label;

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
