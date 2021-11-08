import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryItemComponent } from './categories-list/category-item/category-item.component';
import { CategoryDetailComponent } from './categories-list/categorie-detail/category-detail.component';
import { NoteDetailComponent } from './categories-list/categorie-detail/notes-list/note-detail/note-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NoteItemComponent } from './categories-list/categorie-detail/notes-list/note-item/note-item.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateCategoryComponent } from './create-category/create-category.component';
import { RenameCategoryComponent } from './create-category/rename-category/rename-category.component';
import { DeleteCategoryComponent } from './create-category/delete-category/delete-category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { LoggedInComponent } from './logged-in/logged-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesListComponent,
    CategoryItemComponent,
    CategoryDetailComponent,
    NoteDetailComponent,
    NoteItemComponent,
    CreateCategoryComponent,
    RenameCategoryComponent,
    DeleteCategoryComponent,
    AuthComponent,
    DropdownDirective,
    LoggedInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
