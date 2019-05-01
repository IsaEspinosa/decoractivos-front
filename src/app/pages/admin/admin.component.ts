import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminPageComponent implements OnInit {
  public pages: any = null;
  public isLoading = true;

  constructor() {
    this.pages = [
      {
        name: 'Ambientes',
        link: '/admin/ambientes',
        icon: 'assets/img/icons/environments.svg'
      },
      {
        name: 'Usuarios',
        link: '/admin/usuarios',
        icon: 'assets/img/icons/users.svg'
      },
      {
        name: 'Planes',
        link: '/admin',
        icon: 'assets/img/icons/plans.svg'
      },
      {
        name: 'Prueba de Simulador',
        link: '/ambientes',
        icon: 'assets/img/icons/simulator.svg'
      }
    ];
  }

  ngOnInit() {
    setTimeout(() => (this.isLoading = false), 1000);
  }
}

export const AdminPageInternalComponents = [AdminPageComponent];
