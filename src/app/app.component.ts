import {Component, OnInit} from '@angular/core';
import {DataService} from "./data/data.service";
import {migrateLegacyGlobalConfig} from "@angular/cli/utilities/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'notes-app';
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.dataService.fetchCategories();
  }
}
