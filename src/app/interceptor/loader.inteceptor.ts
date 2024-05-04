import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  BehaviorSubject,
  Observable,
  map,
  throwError,
  catchError,
  finalize,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject<boolean>(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private _requests = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private status: HTTPStatus,
    private authService: AuthService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ++this._requests;
    let headers;

    if (req.url.includes('api.ipify.org')) {
      headers = new HttpHeaders({
        contentType: 'false',
        processData: 'false',
      });
    } else if (req.body instanceof FormData) {
      headers = new HttpHeaders({
        contentType: 'false',
        processData: 'false',
        Authorization: 'Bearer ' + this.authService.getToken,
      });
    } else {
      headers = new HttpHeaders()
        .append('accept', 'application/json')
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + this.authService.getToken);
    }

    let request = req.clone({ headers });
    this.status.setHttpStatus(true);
    this.spinner.show();

    return next.handle(request).pipe(
      map((event) => {
        return event;
      }),
      catchError((error: Response) => {
        if (error.status === 401) {
          this.router.navigate(['']);
        }
        return throwError(error);
      }),
      finalize(() => {
        --this._requests;
        this.status.setHttpStatus(this._requests > 0);
        this.status.getHttpStatus().subscribe((status: boolean) => {
          if (!status) this.spinner.hide();
        });
      })
    );
  }
}
