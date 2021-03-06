import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { QueryRequest } from "../../models/query-request";
import { ColumnSetting } from "../../models/column-setting";

/**
 * @title Table with pagination
 */
@Component({
  selector: "app-table",
  styleUrls: ["table.scss"],
  templateUrl: "table.html"
})
export class TableComponent implements OnInit {
  @Input() columnSettings: ColumnSetting;
  @Input() dataSource: MatTableDataSource<any>;
  @Output() page = new EventEmitter<any>();
  @Input() query: QueryRequest;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {}

  onPage(event) {
    this.page.emit(event);
  }
}
