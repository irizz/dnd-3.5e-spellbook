import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-components-info",
  templateUrl: "./components-info.component.html",
  styleUrls: ["./components-info.component.scss"]
})
export class ComponentsInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ComponentsInfoComponent>) {}

  ngOnInit() {}

  onExitClick(): void {
    this.dialogRef.close();
  }
}
