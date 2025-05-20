import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nuevaPassword: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      confirmarPassword: ['', [Validators.required]]
    }, {
      validators: [this.passwordsIguales('nuevaPassword', 'confirmarPassword')]
    });
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password1 = formGroup.get(pass1)?.value;
      const password2 = formGroup.get(pass2)?.value;
      if (password1 !== password2) {
        formGroup.get(pass2)?.setErrors({ noCoinciden: true });
        return { noCoinciden: true };
      } else {
        return null;
      }
    };
  }

  cambiarPassword(): void {
    if (this.form.valid) {
      alert('Contraseña cambiada exitosamente. Serás redirigido al login.');
      this.router.navigate(['/login']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/login']);
  }
}
