import {SimulatorEditorInternalComponents} from './simulator-editor/simulator-editor.component';
import {LayerCreateComponent} from './simulator-editor/layer-create/layer-create.component';

export const AdminSimulatorComponents = [
  ...SimulatorEditorInternalComponents,
  LayerCreateComponent,
];

export const AdminSimulatorEntryComponents = [
  LayerCreateComponent
];
