import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from "../../categories-list/category.model";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../data/data.service";

@Component({
  selector: 'app-rename-category',
  templateUrl: './rename-category.component.html',
  styleUrls: ['./rename-category.component.css']
})
export class RenameCategoryComponent implements OnInit {
  @Input() category!: Category;
  @Output() doneRenaming = new EventEmitter<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.doneRenaming.emit();
  }

  onContinue(form: NgForm) {
    this.category.name = form.value.name;
    console.log(this.category.name);
    this.dataService.updateCategory(this.category);
    console.log(form.value.name);
    this.doneRenaming.emit();
  }
}
