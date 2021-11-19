import {Component, OnInit} from '@angular/core';
import {DataService} from "./data/data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'notes-app';
  authMode = true;
  constructor(private router: Router,
              private dataService: DataService) {
  }
  ngOnInit() {
    this.dataService.isLoggedIn().subscribe();
  }
}
 //   TODO: afisat data in notes-list
 //
