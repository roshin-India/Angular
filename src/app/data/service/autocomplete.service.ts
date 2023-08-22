import { Injectable } from '@angular/core';
import { HttpMethodsService } from '@app/core/service/http-methods.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  constructor(private http: HttpMethodsService) {}

  countryAutocomplete(objParam: any): Observable<any> {
    return this.http.method['post']('autocomplete', 'country', objParam).pipe(
      take(1)
    );
  }

  stateAutocomplete(objParam: any): Observable<any> {
    return this.http.method['post']('autocomplete', 'state', objParam).pipe(
      take(1)
    );
  }
  portfolioAutocomplete(objParam: any): Observable<any> {
    return this.http.method['post']('autocomplete', 'portfolio', objParam).pipe(
      take(1)
    );
  }
  investorAutocomplete(objParam: any): Observable<any> {
    return this.http.method['post']('autocomplete', 'investor', objParam).pipe(
      take(1)
    );
  }
}
