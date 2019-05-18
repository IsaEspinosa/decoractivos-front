import {
  UsersListInternalComponents,
  UsersListPageComponent
} from "./users-list/users-list.component";
import {
  CreateUserInternalComponents,
  CreateUserPageComponent
} from "./users-create/users-create.component";

/**
 * Created by garusis on 3/06/18.
 */

export const UsersPagesComponents = [
  ...UsersListInternalComponents,
  ...CreateUserInternalComponents
];

export const UsersEntryComponents = [
  UsersListPageComponent,
  CreateUserPageComponent
];
