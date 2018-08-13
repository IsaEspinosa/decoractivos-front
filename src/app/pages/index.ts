import {LandingInternalComponents} from "./landing/landing.component";
import {SimulatorInternalComponents} from "./simulator/simulator.component";
import {EnvironmentsInternalComponents} from "./environments/environments.component";
/**
 * Created by garusis on 3/06/18.
 */

export const PagesComponents = [
  ...LandingInternalComponents,
  ...EnvironmentsInternalComponents,
  ...SimulatorInternalComponents
];
