import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatTableDataSource,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-csv-preview",
  templateUrl: "./csv-preview.component.html",
  styleUrls: ["./csv-preview.component.scss"],
})
export class CsvPreviewComponent {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[];
  public selection = new SelectionModel<any>(true, []);
  public error: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<CsvPreviewComponent>
  ) {
    if (data && data.hasOwnProperty("fields")) {
      this.dataSource = new MatTableDataSource(data.fields);
    }
    if (data && data.hasOwnProperty("columns")) {
      this.displayedColumns = ["select", ...data.columns];
    }
    if (data && data.hasOwnProperty("error")) {
      this.error = data.error;
    }
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  public saveList(): void {
    this.dialogRef.close(this.selection.selected);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
