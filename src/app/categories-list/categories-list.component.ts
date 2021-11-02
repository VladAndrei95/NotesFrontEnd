import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import {CategoryService} from "./category.service";
import {NoteService} from "./categorie-detail/notes-list/note.service";
import {DataService} from "../data/data.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories!: Category[];
  createMode = false;
  constructor(private categoryService: CategoryService,
              private noteService: NoteService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.categoryService.categoriesChanged.subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    })
  }
  onCreateCategory() {
    this.createMode = true;
    // this.categoryService.addCategory();
  }
  onGetNotes(category: Category) {
  this.noteService.resetNotes();
  this.dataService.fetchNotes(category);
  }
  onCreated() {
    this.createMode = false;
  }
}
