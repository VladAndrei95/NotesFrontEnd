import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Note} from "./note.model";
import {DataService} from "../../../data/data.service";
import {NoteService} from "./note.service";
import {CategoryService} from "../../category.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class NotesResolverService implements Resolve<Note[]> {
  constructor(private dataService: DataService,
              private noteService: NoteService,
              private categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> | Promise<Note[]> | Note[] {
    let notes = this.noteService.getNotes();
    if (notes.length === 0) {
      return this.dataService.fetchNotes(+route.params['id']);
    } else {
      return notes;
    }
  }
}
