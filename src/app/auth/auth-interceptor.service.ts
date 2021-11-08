import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {exhaustMap, take,} from "rxjs/operators";
import {DataService} from "../data/data.service";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private dataService: DataService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  this.dataService.user.pipe(take(1),exhaustMap(
      user => {
        if(!user) {
          return  next.handle(req);
        } else {
          const modifiedReq = req.clone({ headers: req.headers.set('withCredentials','true')});
          console.log(modifiedReq);
          return next.handle(modifiedReq);
        }}))
  }
}
