import { EnvironmentListInternalComponents } from './environment-list/environment-list.component';
import { CreateEnvironmentInternalComponents } from './environment-create/environment-create.component';
import { EditEnvironmentInternalComponents } from './environment-create/environment-edit.component';
import {
  AdminSimulatorComponents,
  AdminSimulatorEntryComponents
} from './simulator';
import { AdminPageInternalComponents } from './admin.component';
import { CreateEnvironmentTypeComponent } from './environment-type-create/environment-type-create.component';
import { UsersEntryComponents, UsersPagesComponents } from './users';

/**
 * Created by garusis on 3/06/18.
 */
export const AdminPagesComponents = [
  ...EnvironmentListInternalComponents,
  ...CreateEnvironmentInternalComponents,
  ...EditEnvironmentInternalComponents,
  ...AdminSimulatorComponents,
  ...AdminPageInternalComponents,
  ...UsersPagesComponents
];

export const AdminEntryComponents = [
  CreateEnvironmentTypeComponent,
  ...AdminSimulatorEntryComponents,
  ...UsersEntryComponents
];
