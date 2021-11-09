import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryDetailComponent} from "./categories-list/categorie-detail/category-detail.component";
import {NoteDetailComponent} from "./categories-list/categorie-detail/notes-list/note-detail/note-detail.component";
import {CategoryResolverService} from "./categories-list/categorie-detail/category-resolver.service";
import {NotesResolverService} from "./categories-list/categorie-detail/notes-list/notes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {LoggedInComponent} from "./logged-in/logged-in.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {HomeComponent} from "./categories-list/home/home.component";


const routes: Routes = [
  {path:'auth', component: AuthComponent},
  {path:'', component: LoggedInComponent, canActivate:[AuthGuardService], children:[
      {path:'home', component: HomeComponent},
      {path:':id', component: CategoryDetailComponent,resolve: [CategoryResolverService,NotesResolverService],
        children:[
          {path:':id' , component: NoteDetailComponent}
        ]},
    ]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
