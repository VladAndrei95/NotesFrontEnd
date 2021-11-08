import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../data/data.service";
import {Category} from "../../categories-list/category.model";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  @Output() doneDeleting = new EventEmitter<void>();
  @Input() category!: Category;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.doneDeleting.emit();
  }

  onDelete() {
    this.dataService.deleteCategory(this.category);
    this.doneDeleting.emit();
  }
}
