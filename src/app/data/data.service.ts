import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Category} from "../categories-list/category.model";
import {CategoryService} from "../categories-list/category.service";
import {NoteService} from "../categories-list/categorie-detail/notes-list/note.service";
import {Note} from "../categories-list/categorie-detail/notes-list/note.model";
interface CategoryResponse {
  id: number;
  name: string;
  created_at: Date;
}
interface NoteResponse {
  id: number;
  title: string;
  content: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

@Injectable({providedIn:'root'})
export class DataService{
  constructor(private http: HttpClient,
              private categoryService: CategoryService,
              private noteService: NoteService) {
  }
  fetchCategories() {
    this.http.get<CategoryResponse[]>('http://localhost:3001/categories').pipe
    (tap(categoriesResponse => {
      let categories = categoriesResponse.map(categoryResponse => {
        let category = new Category(categoryResponse.id,categoryResponse.name);
        return category;
      } );
      console.log('response:',categories);
      this.categoryService.setCategories(categories)})).subscribe();
  }
  fetchNotes(category: Category) {
    this.http.get<NoteResponse[]>('http://localhost:3001/notes/'+category.id).pipe(
      tap(notesResponse => {
        let notes = notesResponse.map(noteResponse => {
          let note = new Note(noteResponse.id,noteResponse.title,noteResponse.content,noteResponse.category_id);
          return note;
        });
        this.noteService.setNotes(notes);
      })
    ).subscribe();
  }
  addCategory(name:string){
    this.http.post('http://localhost:3001/categories',{
      categoryName: name
    }).subscribe(response => {
      this.fetchCategories();
    });
  }

}
