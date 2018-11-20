import {EnvironmentListInternalComponents} from './environment-list/environment-list.component';
import {CreateEnvironmentInternalComponents} from './environment-create/environment-create.component';
import {EditEnvironmentInternalComponents} from './environment-create/environment-edit.component';
import {CreateEnvironmentTypeComponent} from './environment-type-create/environment-type-create.component';

/**
 * Created by garusis on 3/06/18.
 */

export const AdminPagesComponents = [
  ...EnvironmentListInternalComponents,
  ...CreateEnvironmentInternalComponents,
  ...EditEnvironmentInternalComponents,
];

export const AdminEntryComponents = [
  CreateEnvironmentTypeComponent,
];
