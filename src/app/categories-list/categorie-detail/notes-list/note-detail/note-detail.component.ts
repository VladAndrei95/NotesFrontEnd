import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Note } from '../note.model';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../category.service";
import {NgForm} from "@angular/forms";
import {NoteService} from "../note.service";
import {Category} from "../../../category.model";
import {DataService} from "../../../../data/data.service";
import {faPenFancy} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @ViewChild('f') noteForm!: NgForm;
  note!: Note;
  toSaveNote!: Note;
  category!: Category;
  faPenFancy = faPenFancy;
  saved: boolean = false
  editorStyle = {
    height: '75%',
    width: '100%',
    border: 'none',
    color: 'white'
  }
  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private router: Router,
              private categoryService: CategoryService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let url = this.router.url.split('/');
      let categoryId = +url[1];
      this.category = this.categoryService.getCategory(categoryId);
      this.note = this.noteService.getNote(+url[2]);
      this.toSaveNote = new Note(this.note.title, this.note.content, this.note.category_id,this.note.updated_at, this.note.id! | null!);
      this.saved = false;
  });
  }
  onSaveNote() {
    this.dataService.saveNote(this.toSaveNote);
    this.saved = true;
  }
  onDeleteNote() {
    // @ts-ignore
    this.dataService.deleteNote(this.note.id,this.category.id);
    // this.router.navigate(['../'],{relativeTo: this.route})
  }
}


