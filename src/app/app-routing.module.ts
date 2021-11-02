import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryDetailComponent} from "./categories-list/categorie-detail/category-detail.component";
import {NoteDetailComponent} from "./categories-list/categorie-detail/notes-list/note-detail/note-detail.component";

const routes: Routes = [
  {path:'\:id', component: CategoryDetailComponent,
    children:[
      {path:'\:id' , component: NoteDetailComponent}
    ]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
