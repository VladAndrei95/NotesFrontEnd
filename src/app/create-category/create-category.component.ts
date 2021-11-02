import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../data/data.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Output() done = new EventEmitter<void>();
  @ViewChild('f') catForm!: NgForm;
  categoryName!: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  onCancel() {
    this.done.emit();
  }
  onCreate(form: NgForm){
    this.dataService.addCategory(form.value.name);
    this.done.emit();
  }
}

