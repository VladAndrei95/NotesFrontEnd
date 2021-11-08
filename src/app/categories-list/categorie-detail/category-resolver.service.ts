import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Category} from "../category.model";
import {Observable} from "rxjs";
import {DataService} from "../../data/data.service";
import {CategoryService} from "../category.service";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class CategoryResolverService implements Resolve<Category[]> {
  constructor(private dataService: DataService,
              private categoryService: CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> | Promise<Category[]> | Category[] {
    let categories = this.categoryService.getCategories();
    if (categories.length === 0) {
      return this.dataService.fetchCategories()
    } else {
      return categories;
    }
  }
}
