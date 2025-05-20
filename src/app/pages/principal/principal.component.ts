/*import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

} */
// principal.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component'; // Corrected import
import { LOGIN } from '../../constantes';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  nombreUsuario : string = '';

  isCollapsed = false;
  menuItems = [
    { label: 'Inicio', route: '/principal', icon: 'fa-home' },
    { label: 'Solicitar cita', route: '/gestionar-cita', icon: 'fa-calendar' },
    { label: 'Mis citas', route: '/historial-clinico', icon: 'fa-list-ul' },
    { label: 'Dr. en línea', route: '/dr-online', icon: 'fa-laptop' },
    { label: 'Mi cuenta', route: '/usuario', icon: 'fa-user' },
    { label: 'Pedir ambulancia', route: '/pedir-ambulancia', icon: 'fa-ambulance', isDanger: true },
    { label: 'Salir', route: '/login', icon: 'fa-sign-out-alt', isWarning: true }
  ];
  dashboardCards = [
    { title: 'Solicitar citas', description: 'Agenda tu cita médica fácilmente.', buttonText: 'Ir', route: '/gestionar-cita', color: '#ffeb3b' },
    { title: 'Mis citas', description: 'Consulta tus citas agendadas.', buttonText: 'Ver citas', route: '/historial-clinico', color: '#4caf50' },
    { title: 'Mis exámenes', description: 'Revise resultados de exámenes médicos.', buttonText: 'Ver', route: '/historial-clinico', color: '#00bcd4' },
    { title: 'Dr. Online', description: 'Consulta con un médico en línea.', buttonText: 'Acceder', route: '/dr-online', color: '#ff9800' }
  ];
  constructor(private router: Router) {}
  ngOnInit(): void {
    const nombre = sessionStorage.getItem(LOGIN.NOMBRE_USUARIO);
    this.nombreUsuario = nombre ? nombre : 'Usuario';
    this.cargarDatosInicio();
    this.inicializarBotonPedirAmbulancia();
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  reiniciarInicio() {
    console.log('Reiniciando la página de Inicio...');
    this.cargarDatosInicio();
  }
  cargarDatosInicio() {
    console.log('Cargando datos de la página de Inicio.');
  }
  inicializarBotonPedirAmbulancia() {
    const pedirAmbulanciaBtn = document.getElementById('pedir-ambulancia-btn');
    const emergenciaModal = document.getElementById('emergencia-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (pedirAmbulanciaBtn) {
      pedirAmbulanciaBtn.addEventListener('click', () => {
        if (emergenciaModal) {
          emergenciaModal.style.display = 'flex';
        }
      });
    }
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        if (emergenciaModal) {
          emergenciaModal.style.display = 'none';
        }
      });
    }
    window.addEventListener('click', (event) => {
      if (emergenciaModal && event.target === emergenciaModal) {
        emergenciaModal.style.display = 'none';
      }
    });
  }
}

