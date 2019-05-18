import { SimulatorEditorInternalComponents } from "./simulator-editor/simulator-editor.component";
import { LayerCreateComponent } from "./simulator-editor/layer-create/layer-create.component";
import { CreateCategoryComponent } from "./simulator-editor/category-create/category-create.component";
import { UpdateCategoryComponent } from "./simulator-editor/category-create/category-update.component";
import { DeleteCategoryComponent } from "./simulator-editor/category-create/category-delete.component";
import { DeleteLayerComponent } from "./simulator-editor/layer-delete/layer-delete.component";
import { ItemCreateComponent } from "./simulator-editor/item-create/item-create.component";
import { ItemEditComponent } from "./simulator-editor/item-create/item-edit.component";

export const AdminSimulatorComponents = [
  ...SimulatorEditorInternalComponents,
  LayerCreateComponent,
  CreateCategoryComponent,
  UpdateCategoryComponent,
  DeleteCategoryComponent,
  ItemCreateComponent,
  ItemEditComponent,
  DeleteLayerComponent
];

export const AdminSimulatorEntryComponents = [
  LayerCreateComponent,
  CreateCategoryComponent,
  UpdateCategoryComponent,
  DeleteCategoryComponent,
  ItemCreateComponent,
  ItemEditComponent,
  DeleteLayerComponent
];
