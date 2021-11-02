import {Component, OnInit, ViewChild} from '@angular/core';
import { Note } from '../note.model';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../category.service";
import {NgForm} from "@angular/forms";
import {NoteService} from "../note.service";
import {Category} from "../../../category.model";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @ViewChild('f') noteForm!: NgForm;
  note!: Note;
  category!: Category;
  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let url = this.router.url.split('/');
      let categoryId = +url[1];
      this.category = this.categoryService.getCategory(categoryId);
      this.note = this.noteService.getNote(this.category,+url[2]);
      console.log(this.note)
  });
  }

    onSave(form: NgForm) {
    }
  }


