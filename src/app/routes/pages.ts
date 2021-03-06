import { LandingComponent } from "../pages/landing/landing.component";
import { SimulatorComponent } from "../pages/simulator/simulator.component";
import { EnvironmentsComponent } from "../pages/environments/environments.component";
import { EnvironmentListPageComponent } from "../pages/admin/environment-list/environment-list.component";
import { CreateEnvironmentPageComponent } from "../pages/admin/environment-create/environment-create.component";
import { EditEnvironmentPageComponent } from "../pages/admin/environment-create/environment-edit.component";
import { SimulatorEditorPageComponent } from "../pages/admin/simulator/simulator-editor/simulator-editor.component";
import { AuthGuard } from "../common/guards/auth-guard.service";
import { LoginComponent } from "../pages/login/login.component";
import { PasswordSetupComponent } from "../pages/password-setup/password-setup.component";
import { AdminPageComponent } from "../pages/admin/admin.component";
import { UsersListPageComponent } from "../pages/admin/users/users-list/users-list.component";
import { CreateUserPageComponent } from "../pages/admin/users/users-create/users-create.component";
import { TokenGuard } from "../common/guards/guest-guard.service";
import { UnpaidGuard } from "../common/guards/unpaid-guard.service";

/**
 * Created by garusis on 2/06/18.
 */
export const PagesRoutes = [
  {
    path: "",
    data: { role: "all" },
    component: LandingComponent,
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { role: "guest" },
    pathMatch: "full"
  },
  {
    path: "usuarios",
    canActivate: [TokenGuard],
    data: { role: "guest" },
    children: [
      {
        path: "configurar-contrasena",
        component: PasswordSetupComponent
      }
    ]
  },
  {
    path: "ambientes",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "client"] },
    component: EnvironmentsComponent,
    pathMatch: "full"
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    data: { roles: ["admin"] },
    children: [
      {
        path: "",
        component: AdminPageComponent
      },
      {
        path: "ambientes",
        children: [
          {
            path: "",
            component: EnvironmentListPageComponent
          },
          {
            path: "crear",
            component: CreateEnvironmentPageComponent
          },
          {
            path: ":environment_slug",
            children: [
              {
                path: "",
                component: SimulatorEditorPageComponent
              },
              {
                path: "editar",
                component: EditEnvironmentPageComponent
              }
            ]
          }
        ]
      },
      {
        path: "usuarios",
        children: [
          {
            path: "",
            component: UsersListPageComponent
          },
          {
            path: "crear",
            canActivate: [UnpaidGuard],
            component: CreateUserPageComponent
          }
        ]
      }
    ]
  },
  {
    path: "simulador/:environment_slug",
    canActivate: [AuthGuard],
    data: { roles: ["admin", "client"] },
    component: SimulatorComponent,
    pathMatch: "full"
  }
];
