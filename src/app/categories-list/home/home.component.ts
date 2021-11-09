import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!: string | null;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.user.subscribe(user => {
      this.username = user ? user.name : null;
    })
  }

}
