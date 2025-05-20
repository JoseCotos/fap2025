import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'recuperar-password', loadComponent: () => import('./pages/login/recuperar-password/recuperar-password.component').then(m => m.RecuperarPasswordComponent) },
  { path: 'validar-pin', loadComponent: () => import('./pages/login/recuperar-password/validar-pin/validar-pin.component').then(m => m.ValidarPinComponent) },
  { path: 'cambiar-password', loadComponent: () => import('./pages/login/recuperar-password/cambiar-password/cambiar-password.component').then(m => m.CambiarPasswordComponent) },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'principal', loadComponent: () => import('./pages/principal/principal.component').then(m => m.PrincipalComponent) },
      { path: 'gestionar-cita', loadComponent: () => import('./pages/principal/gestionar-cita/gestionar-cita.component').then(m => m.GestionarCitaComponent) },
      { path: 'reservar-medico', loadComponent: () => import('./pages/principal/gestionar-cita/reservar-medico/reservar-medico.component').then(m => m.ReservarMedicoComponent) },
      { path: 'reservar-especialidad', loadComponent: () => import('./pages/principal/gestionar-cita/reservar-especialidad/reservar-especialidad.component').then(m => m.ReservarEspecialidadComponent) },
      { path: 'seleccionar-especialidad', loadComponent: () => import('./pages/principal/gestionar-cita/seleccionar-especialidad/seleccionar-especialidad.component').then(m => m.SeleccionarEspecialidadComponent) },
      { path: 'seleccionar-medico', loadComponent: () => import('./pages/principal/gestionar-cita/seleccionar-medico/seleccionar-medico.component').then(m => m.SeleccionarMedicoComponent) },
      { path: 'reservar-laboratorio', loadComponent: () => import('./pages/principal/gestionar-cita/reservar-laboratorio/reservar-laboratorio.component').then(m => m.ReservarLaboratorioComponent) },
      { path: 'resumen-cita', loadComponent: () => import('./pages/principal/gestionar-cita/resumen-cita/resumen-cita.component').then(m => m.ResumenCitaComponent) },
      { path: 'mensaje-confirmacion-cita', loadComponent: () => import('./pages/principal/gestionar-cita/mensaje-confirmacion-cita/mensaje-confirmacion-cita.component').then(m => m.MensajeConfirmacionCitaComponent) },
      { path: 'cancelar-cita', loadComponent: () => import('./pages/principal/gestionar-cita/cancelar-cita/cancelar-cita.component').then(m => m.CancelarCitaComponent) },
      { path: 'confirmar-cancelacion', loadComponent: () => import('./pages/principal/gestionar-cita/confirmar-cancelacion/confirmar-cancelacion.component').then(m => m.ConfirmarCancelacionComponent) },
      { path: 'mensaje-cancelacion', loadComponent: () => import('./pages/principal/gestionar-cita/mensaje-cancelacion/mensaje-cancelacion.component').then(m => m.MensajeCancelacionComponent) },
      { path: 'reprogramar-cita', loadComponent: () => import('./pages/principal/gestionar-cita/reprogramar-cita/reprogramar-cita.component').then(m => m.ReprogramarCitaComponent) },
{ path: 'mis-citas', loadComponent: () => import('./pages/principal/mis-citas/mis-citas.component').then(m => m.MisCitasComponent) },
      { path: 'doctor-en-linea', loadComponent: () => import('./pages/principal/doctor-en-linea/doctor-en-linea.component').then(m => m.DoctorEnLineaComponent) },
      { path: 'teleconsulta', loadComponent: () => import('./pages/principal/doctor-en-linea/teleconsulta/teleconsulta.component').then(m => m.TeleconsultaComponent) },
{ path: 'pediatria', loadComponent: () => import('./pages/principal/doctor-en-linea/pediatria/pediatria.component').then(m => m.PediatriaComponent) },
      { path: 'usuario', loadComponent: () => import('./pages/principal/usuario/usuario.component').then(m => m.UsuarioComponent) },
      { path: 'pedir-ambulancia', loadComponent: () => import('./pages/principal/pedir-ambulancia/pedir-ambulancia.component').then(m => m.PedirAmbulanciaComponent) },
    ]
  },
];