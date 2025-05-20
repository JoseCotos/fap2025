import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';
import { CITA } from '../../../../constantes';

@Component({
  selector: 'app-reservar-especialidad',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, NgFor],
  templateUrl: './reservar-especialidad.component.html',
  styleUrl: './reservar-especialidad.component.css'
})
export class ReservarEspecialidadComponent {
  idEspecialidad: string = '';
  nomEspecialidad: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly ps: ProjectService
  ){}

  reservaMedicoForm = this.fb.group({
    txtEspecialidad: [""],
    selEspecialidad: [""]
  })
  
 
  btnAtraz(){
    if(this.reservaMedicoForm.valid)
      console.log(this.reservaMedicoForm.value)
    else
      this.router.navigate(['/gestionar-cita']);
  }

  btnContinuar(){
    if (this.idEspecialidad){
      sessionStorage.setItem(CITA.ID_ESPECIALIDAD, this.idEspecialidad);
      sessionStorage.setItem(CITA.NOMBRE_ESPECIALIDAD, this.nomEspecialidad);
      this.router.navigate(['/seleccionar-medico']);
    } else {
      alert('Seleccionar una especialidad');
    }
  }

  especialidades: any = []

  __listar_especialidades(){
    this.ps.listar_especialidades().subscribe((rest: any) => {
      this.especialidades = rest.data
      console.log(this.especialidades)
    })
  }

  ngOnInit(): void {
    this.__listar_especialidades()
    console.log(sessionStorage)
  }

  getEspecialidad(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.idEspecialidad = objSelect.value;
    this.nomEspecialidad = objSelect.options[objSelect.options.selectedIndex].label;
  }

}
