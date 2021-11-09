import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take } from "rxjs/operators";
import {DataService} from "../data/data.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{
      constructor(private dataService: DataService,
                  private router: Router) {
      }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.dataService.user.pipe(take(1),
          map(user =>
        {
          console.log(user);
          const isAuth = !!user;
          console.log(isAuth);
          if(isAuth) {
            return true;}
          else {
            return this.router.createUrlTree(['/auth']);}
        }));
  }
}
