import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() inicioClicked = new EventEmitter<void>();

    isCollapsed = false;
    menuItems = [
        { label: 'Inicio', route: '/principal', icon: 'fa-home' },
        { label: 'Solicitar cita', route: '/gestionar-cita', icon: 'fa-calendar' },
        { label: 'Mis citas', route: '/mis-citas', icon: 'fa-list-ul' },
        { label: 'Doctor en línea', route: '/doctor-en-linea', icon: 'fa-laptop-medical' },
        { label: 'Mi cuenta', route: '/usuario', icon: 'fa-user' },
        { label: 'Pedir ambulancia', route: '/pedir-ambulancia', icon: 'fa-ambulance', isDanger: true }, // Agrega esto
        { label: 'Salir', route: '/login', icon: 'fa-sign-out-alt', isWarning: true }
    ];

    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit(): void {
        this.loadFontAwesome();
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    onInicioClick() {
        this.inicioClicked.emit();
    }

    loadFontAwesome() {
        const link = this.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';  // Asegúrate de que esta URL sea correcta
        this.document.head.appendChild(link);
    }

    mostrarNumeroEmergencia() {
        // Aquí va la lógica para mostrar el número de emergencia
        alert('Teléfono de Emergencia: 911'); // Ejemplo: muestra un alert
        // Otra opción: podrías actualizar una variable y mostrarla en el template
        // this.numeroEmergencia = '911';
    }
}
