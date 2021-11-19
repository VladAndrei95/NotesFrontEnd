import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map, take } from "rxjs/operators";
import {DataService} from "../data/data.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{
  subscription!: Subscription;
      constructor(private dataService: DataService,
                  private router: Router) {
      }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res) => {
      this.subscription = this.dataService.isLoggedIn().subscribe(response => {
          res(true)
        },
        error => {
          if (error.status === 401)
            res(this.router.navigate(['/auth']));
        });
    });
  }
}


// return this.dataService.user.pipe(take(1),
//   map(user =>
//   {
//     const isAuth = !!user;
//     if(isAuth) {
//       return true;}
//     else {
//       return this.router.createUrlTree(['/auth']);}
//   }));
