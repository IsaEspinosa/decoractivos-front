import { LandingInternalComponents } from "./landing/landing.component";
import { SimulatorInternalComponents } from "./simulator/simulator.component";
import { EnvironmentsInternalComponents } from "./environments/environments.component";
import { LoginInternalComponents } from "./login/login.component";
import { PassworSetupInternalComponents } from "./password-setup/password-setup.component";
import { AdminPagesComponents, AdminEntryComponents } from "./admin";
import { ErrorSnackComponent } from "../common/components/error-snack/error-snack.component";
import { SuccessSnackComponent } from "../common/components/success-snack/success-snack.component";

/**
 * Created by garusis on 3/06/18.
 */

export const PagesComponents = [
  ...LandingInternalComponents,
  ...EnvironmentsInternalComponents,
  ...SimulatorInternalComponents,
  ...LoginInternalComponents,
  ...AdminPagesComponents,
  ...PassworSetupInternalComponents,
  ErrorSnackComponent,
  SuccessSnackComponent
];

export const EntryComponents = [
  ...AdminEntryComponents,
  ...PassworSetupInternalComponents,
  ErrorSnackComponent,
  SuccessSnackComponent
];
