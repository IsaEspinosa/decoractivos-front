import {SimulatorEditorInternalComponents} from './simulator-editor/simulator-editor.component';
import {LayerCreateComponent} from './simulator-editor/layer-create/layer-create.component';
import {CreateCategoryComponent} from './simulator-editor/category-create/category-create.component';

export const AdminSimulatorComponents = [
  ...SimulatorEditorInternalComponents,
  LayerCreateComponent,
  CreateCategoryComponent
];

export const AdminSimulatorEntryComponents = [
  LayerCreateComponent,
  CreateCategoryComponent
];
