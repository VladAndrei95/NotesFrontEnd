import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Category} from "../categories-list/category.model";
import {CategoryService} from "../categories-list/category.service";
import {NoteService} from "../categories-list/categorie-detail/notes-list/note.service";
import {Note} from "../categories-list/categorie-detail/notes-list/note.model";
import {BehaviorSubject} from "rxjs";

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

interface User {
  name: string;
  pass: string;
}

@Injectable({providedIn: 'root'})
export class DataService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient,
              private categoryService: CategoryService,
              private noteService: NoteService) {
  }

    signIn(name: string,pass:string) {
    return this.http.post('http://localhost:3001/login',{
      username:name,
      password:pass
    },{withCredentials: true}).pipe(tap(response => {
      this.user.next({name: name,pass: pass});
    }))
  }
  createAccount(name: string,pass:string) {
    this.http.post('http://localhost:3001/register',{
      username:name,
      password:pass
    }).subscribe();
  }

  fetchCategories() {
    return this.http.get<CategoryResponse[]>('http://localhost:3001/categories').pipe
    (tap(categoriesResponse => {
      let categories = categoriesResponse.map(categoryResponse => {
        let category = new Category(categoryResponse.id, categoryResponse.name);
        return category;
      });
      this.categoryService.setCategories(categories)
    }));
  }

  fetchNotes(id: number) {
    return this.http.get<NoteResponse[]>('http://localhost:3001/notes/' + id).pipe(
      tap(notesResponse => {
        let notes = notesResponse.map(noteResponse => {
          let note = new Note(noteResponse.title, noteResponse.content, noteResponse.category_id, noteResponse.id);
          return note;
        });
        this.noteService.setNotes(notes);
      })
    );
  }

  addCategory(name: string) {
    this.http.post('http://localhost:3001/categories', {
      categoryName: name
    }).subscribe(response => {
      this.fetchCategories().subscribe();
    });
  }

  deleteCategory(category: Category) {
    this.http.delete('http://localhost:3001/categories/' + category.id)
      .subscribe(response => this.fetchCategories().subscribe());
  }

  updateCategory(category: Category) {
    this.http.patch('http://localhost:3001/categories/'+category.id, {
      categoryName: category.name
    }).subscribe(response => this.fetchCategories().subscribe());
  }


  saveNote(note: Note) {
    this.http.post('http://localhost:3001/notes', {
      categoryId: note.category_id,
      title: note.title,
      content: note.content,
      noteId: note.id
    }).subscribe(response => {
      this.noteService.resetNotes();
      this.fetchNotes(note.category_id).subscribe();
    });
  }

  deleteNote(noteid: number, categoryId: number) {
    this.http.delete('http://localhost:3001/notes/' + noteid).subscribe(response => {
      this.noteService.resetNotes();
      this.fetchNotes(categoryId).subscribe();
    });
  }
}
