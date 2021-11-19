import {Note} from "./note.model";
import {Category} from "../../category.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class NoteService {
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

  getNote(noteIndex: number) {
    return this.notes[noteIndex];
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes: Note[]) {
    this.notes = notes;
    this.notesChanged.next(this.notes.slice());
  }

  // addNote(category: Category) {
  //   let note = new Note('NewNote', 'Write some content', category.id, null)
  //   let newTitle = this.checkIfDuplicate(note);
  //   note.title = newTitle;
  //   this.notes.push(note);
  //   this.notesChanged.next(this.notes.slice());
  // }

  checkIfDuplicate(note: Note) {
    let unique = new Set(this.notes.map(note => note.title));
    let cnt = 1;
    while (cnt) {
      let size = unique.size;
      unique.add(note.title);
      if (size === unique.size) {
        if (cnt === 1) {
          note.title = note.title + '(' + cnt.toString() + ')';
        } else {
          let newNoteTitle = note.title.split('');
          newNoteTitle.splice(newNoteTitle.length-2,1,cnt.toString())
          // newNoteTitle[newNoteTitle.length - 2] = cnt.toString();
          note.title = newNoteTitle.join('');
        }
        cnt++;
      } else {
        cnt = 0;
      }
    }
    return note.title;
  }
}

