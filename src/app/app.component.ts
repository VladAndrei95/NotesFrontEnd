import {Component, OnInit} from '@angular/core';
import {DataService} from "./data/data.service";
import {migrateLegacyGlobalConfig} from "@angular/cli/utilities/config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'notes-app';
  authMode = true;
  constructor(private router: Router) {
  }
  ngOnInit() {

  }

  loggedIn() {
    this.authMode = false;
    this.router.navigate(['login']);
  }
}
