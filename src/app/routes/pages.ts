import {LandingComponent} from "../pages/landing/landing.component";
import {SimulatorComponent} from "../pages/simulator/simulator.component";
/**
 * Created by garusis on 2/06/18.
 */

export const PagesRoutes = [
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: 'simulator', component: SimulatorComponent, pathMatch: 'full'}
];
