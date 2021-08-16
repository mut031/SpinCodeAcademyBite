import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  callApi(url = 'jupiter', body) {
    return this.http.post(url, body);
    // .pipe(catchError(err => {
    //   if (err.status === 401) {
    //     console.error('ISTEKAO TOKEN ', err, err.status);
    //   }
    //   throw err;
    // }));
  }
}
