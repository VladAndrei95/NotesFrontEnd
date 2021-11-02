import { Component, OnInit } from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NoteService} from "./notes-list/note.service";
import { Note } from './notes-list/note.model';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category!: Category;
  notes!: Note[];
  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private noteService: NoteService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
       this.category = this.categoryService.getCategory(+params['id']);
       this.notes = this.noteService.getNotes()
    })
    this.noteService.notesChanged.subscribe(notes => {
      this.notes = notes;
    })
  }
  onCreateNote() {

  }
}
