import {SimulatorEditorInternalComponents} from './simulator-editor/simulator-editor.component';
import {LayerCreateComponent} from './simulator-editor/layer-create/layer-create.component';
import {CreateCategoryComponent} from './simulator-editor/category-create/category-create.component';
import {UpdateCategoryComponent} from './simulator-editor/category-create/category-update.component';
import {DeleteCategoryComponent} from './simulator-editor/category-create/category-delete.component';

export const AdminSimulatorComponents = [
  ...SimulatorEditorInternalComponents,
  LayerCreateComponent,
  CreateCategoryComponent,
  UpdateCategoryComponent,
  DeleteCategoryComponent
];

export const AdminSimulatorEntryComponents = [
  LayerCreateComponent,
  CreateCategoryComponent,
  UpdateCategoryComponent,
  DeleteCategoryComponent
];
