import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CITA, LOGIN } from '../../../constantes';

@Component({
  selector: 'app-gestionar-cita',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './gestionar-cita.component.html',
  styleUrl: './gestionar-cita.component.css'
})
export class GestionarCitaComponent {
  nombreUsuario : string = '';
  tipoCitaMedica : string = '';
  tipoGestion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  gestionarCitaForm = this.fb.group({
    tipoGestionCita: [""],
    tipoCita: ["", [Validators.required]]
  })
  ngOnInit(): void {
    const nombre = sessionStorage.getItem(LOGIN.NOMBRE_USUARIO);
    this.nombreUsuario = nombre ? nombre : 'Usuario';
  }  

  getTipoCita(event: Event){
    const objSelect = event.target as HTMLSelectElement;
    this.tipoCitaMedica = objSelect.value;
  }

  seleccionarMedico(){
    if (this.tipoCitaMedica && this.tipoGestion){
      sessionStorage.setItem(CITA.TIPO_CITA, this.tipoCitaMedica);
      this.router.navigate(['./reservar-medico']);
    } else {
      alert ('Seleccione la opción Reservar Cita y/o Tipo de cita')
    }
  }

  seleccionarEspecialidad(){

  }

  seleccionarLaboratorio(){

  }

  getTipoGestion(event: Event){
    this.tipoGestion = true;
  }

  getTipoGestionC(){
    this.tipoGestion = false;
  }

/* 
  submit(){
    if(this.gestionarCitaForm.valid)
      console.log(this.gestionarCitaForm.value)
    else
      this.router.navigate(['/principal']);
  }

  getTipoDocInvalido(){
    return this.gestionarCitaForm.get("tipoDoc")?.invalid && this.gestionarCitaForm.get("tipoDoc")?.touched
  }

  getNroDocInvalido(){
    return this.gestionarCitaForm.get("nroDoc")?.invalid && this.gestionarCitaForm.get("nroDoc")?.touched
  }

  getPwdInvalido(){
    return this.gestionarCitaForm.get("pwd")?.invalid && this.gestionarCitaForm.get("pwd")?.touched
  }
 */
}
