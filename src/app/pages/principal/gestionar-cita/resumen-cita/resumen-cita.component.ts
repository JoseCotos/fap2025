import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CITA, ESTADO_CITA, LOGIN } from '../../../../constantes';
import { ProjectService } from '../../../../services/project.service';


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
    private router: Router,
    private readonly ps: ProjectService    
  ){ }
 
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

  __insertar_cita_medica(data: any){
    this.ps.insertar_cita_medica(data).subscribe((rest: any) => {
      console.log(data);
      console.log(rest);
    this.router.navigate(['/mensaje-confirmacion-cita']);
    })
  }

  btnContinuar(){
    this.__insertar_cita_medica(this.citaMedica);
  }

citaMedica: any = {
    id_cita : "0",
    id_paciente : sessionStorage.getItem(LOGIN.ID_PACIENTE),
    id_medico : sessionStorage.getItem(CITA.ID_MEDICO),
    fecha : sessionStorage.getItem(CITA.FECHA),
    hora : sessionStorage.getItem(CITA.HORA),
    estado : 'RESERVADO',
    motivo : '.'    
  };

}
