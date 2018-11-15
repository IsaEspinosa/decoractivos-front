import {LandingComponent} from "../pages/landing/landing.component";
import {SimulatorComponent} from "../pages/simulator/simulator.component";
import {EnvironmentsComponent} from "../pages/environments/environments.component";
import {EnvironmentListPageComponent} from "../pages/admin/environment-list/environment-list.component";
import {CreateEnvironmentPageComponent} from "../pages/admin/environment-create/environment-create.component";
import {AuthGuard} from "../common/guards/auth-guard.service";
import {LoginComponent} from "../pages/login/login.component";
/**
 * Created by garusis on 2/06/18.
 */

export const PagesRoutes = [
  {path: '', data: {role: "all"}, component: LandingComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {role: "guest"}, pathMatch: 'full'},
  {
    path: 'ambientes',
    canActivate: [AuthGuard],
    data: {roles: ["admin", "client"]},
    component: EnvironmentsComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {roles: ["admin"]},
    children: [
      {
        path: 'lista',
        data: {roles: ["admin"]},
        component: EnvironmentListPageComponent
      },
      {
        path: 'crear',
        data: {roles: ["admin"]},
        component: CreateEnvironmentPageComponent
      }
    ]
  },
  {
    path: 'simulador/:environment_slug',
    canActivate: [AuthGuard],
    data: {roles: ["admin", "client"]},
    component: SimulatorComponent,
    pathMatch: 'full'
  }
];
