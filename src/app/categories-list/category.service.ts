import {Injectable} from "@angular/core";
import {Category} from "./category.model";
import {Subject} from "rxjs";
import {NoteService} from "./categorie-detail/notes-list/note.service";

@Injectable({providedIn: 'root'})
export class CategoryService{
  categoriesChanged = new Subject<Category[]>();
  private Categories: Category[] = [];
  //   = [
  //   new Category(1,'fericire'),
  //   new Category(2,'tristete')
  // ]
  constructor(private noteService: NoteService) {
  }
  getCategories() {
    return this.Categories;
  }
  getCategory(id: number):Category {
    return this.Categories.find(category => category.id === id)!
}
  setCategories(categories: Category[]) {
    this.Categories = categories;
    this.categoriesChanged.next(this.Categories.slice());
  }
}
