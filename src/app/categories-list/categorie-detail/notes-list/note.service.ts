import { Note } from "./note.model";
import {Category} from "../../category.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
@Injectable({providedIn: 'root'})
export class NoteService{
  notesChanged = new Subject<Note[]>();
  private notes: Note[] = [
    //  new Note(1,'luni','ce zi fericita',1),
    //   new Note(2,'marti','ce zi minunata',1),
    //   new Note(3,'miercuri','ce zi extraordinara',1),
    // new Note(1,'joi','ce zi trista',2),
    // new Note(2,'vineri','ce zi trista',2),
    // new Note(3,'sambata','ce zi trista',2),
  ]
  constructor() {
  }
    getNote(category: Category, noteId: number) {
      return this.notes.find(note => (note.id === noteId && category.id === note.category_id))!
    }
    getNotes(){
      return this.notes;
    }
    setNotes(notes: Note[]){
    this.notes.push(...notes);
    this.notesChanged.next(this.notes.slice());
    }
    resetNotes(){
    this.notes = [];
    }
  addNote(category: Category) {

  }
}

