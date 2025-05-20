import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });

    this.form.get('tipoDocumento')?.valueChanges.subscribe(tipo => {
      const numeroDoc = this.form.get('numeroDocumento');
      if (tipo === 'DNI' || tipo === 'CE' || tipo === 'PAS') {
        numeroDoc?.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
      } else {
        numeroDoc?.clearValidators();
      }
      numeroDoc?.updateValueAndValidity();
    });
  }

  enviarPin(): void {
    if (this.form.valid) {
      console.log('Datos enviados:', this.form.value);
      this.router.navigate(['/validar-pin']); // navegación simulada
    }
  }

  cancelar(): void {
    this.router.navigate(['/login']);
  }
}

