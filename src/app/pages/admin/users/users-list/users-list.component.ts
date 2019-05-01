import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UserService } from "../../../../common/services/user.service";
import { User } from "../../../../common/models/user";
import { ColumnSetting } from "../../../../common/models/column-setting";

@Component({
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListPageComponent implements OnInit {
  public query = {
    limit: 10,
    page: 1,
    count: 0,
    where: {},
    orderBy: [["user_id", "asc"]]
  };

  public columnSettings: ColumnSetting = {
    columnList: ["user_id", "username", "email"],
    settings: {
      user_id: { title: "Id" },
      username: { title: "Usuario" },
      email: { title: "Email" }
    }
  };

  public dataSource = new MatTableDataSource<User>([]);

  constructor(protected userService: UserService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.userService.getCount(this.query).subscribe(data => {
      this.query.count = data.count;
    });
    this.userService.getList(this.query).subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data);
      console.log(data);
    });
  }

  onPageTable(pageData) {
    this.query.limit = pageData.pageSize;
    this.query.page = pageData.pageIndex + 1;
    this.loadTable();
  }
}

export const UsersListInternalComponents = [UsersListPageComponent];
