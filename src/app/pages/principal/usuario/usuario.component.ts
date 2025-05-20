import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  formCuenta!: FormGroup;
  modoEdicion = false;

  constructor(private fb: FormBuilder, private ps: ProjectService) {}

  ngOnInit(): void {
  const id_paciente = sessionStorage.getItem('id_paciente');

  this.formCuenta = this.fb.group({
    nombre: [{ value: '', disabled: true }, Validators.required],
    correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    telefono: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    dni: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    password: [{ value: '', disabled: true }, [Validators.minLength(6)]]
  });

  if (id_paciente) {
    this.ps.obtenerPerfilPorPaciente(id_paciente).subscribe((data: any) => {
      this.formCuenta.patchValue({
        nombre: `${data.nombre} ${data.apellido}`,
        correo: data.correo,
        telefono: data.telefono,
        dni: data.numero_documento
      });
    });
  }
}

limitarDigitos(campo: string, maxDigitos: number): void {
  const valor = this.formCuenta.get(campo)?.value;
  const soloNumeros = valor.replace(/\D/g, ''); // quita letras
  const limitado = soloNumeros.slice(0, maxDigitos);
  this.formCuenta.get(campo)?.setValue(limitado, { emitEvent: false });
}

  activarEdicion(): void {
    this.modoEdicion = true;
    this.formCuenta.enable();
  }

  guardar(): void {
    if (this.formCuenta.valid) {
      const datosActualizados = this.formCuenta.value;
      this.ps.actualizarPerfilUsuario(datosActualizados).subscribe(() => {
        alert('¡Cambios guardados!');
        this.formCuenta.disable();
        this.modoEdicion = false;
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}

