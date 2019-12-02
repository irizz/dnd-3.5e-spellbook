import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sortOptions = ["By school", "By level"]

  constructor(private service: SharedService) { }

  ngOnInit() {
  }

  handleGoToSelectClassClick() {
    this.service.handleGoToSelectClassClick();
  }

}
