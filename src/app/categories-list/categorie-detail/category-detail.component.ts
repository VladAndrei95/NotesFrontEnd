import {Component, OnInit} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NoteService} from "./notes-list/note.service";
import {Note} from './notes-list/note.model';
import {faEllipsisH, faBookOpen, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../data/data.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category!: Category;
  notes!: Note[];
  deleteMode = false;
  renameMode = false;
  dropdownOpen = false;
  faEllipsis = faEllipsisH;
  faBookOpen = faBookOpen;
  faCaretDown = faCaretDown;
  selectNote!: boolean;
  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private noteService: NoteService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.selectNote = false;
    this.route.params.subscribe((params: Params) => {
      this.category = this.categoryService.getCategory(+params['id']);
      this.notes = this.noteService.getNotes()
    })
    this.noteService.notesChanged.subscribe(notes => {
      this.notes = notes;
    })
  }

  onCreateNote() {
    let note = new Note('NewNote', 'Write some content', this.category.id, null,null)
    this.dataService.saveNote(note);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onDeleteCategory() {
    this.deleteMode = true;
  }

  onDoneDeleting() {
    this.deleteMode = false;
  }

  onRenameCategory() {
    this.renameMode = true;
  }

  onDoneRenaming() {
    this.renameMode = false;
  }
  onNoteSelected() {
    this.selectNote = true;
    console.log(this.selectNote)
  }
}
