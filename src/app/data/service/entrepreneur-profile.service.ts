import { IEntrepreneurProfile } from './../schema/entrepreneur-profile';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMethodsService } from '@app/core/service/http-methods.service';
import { of, Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as profiledata from './json/mydata2.json';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurProfileService {
  profiledata: any = (profiledata as any).default;
  data = new Subject();
  entrepreneurProfileData$ = this.data.asObservable();
  constructor(private http: HttpMethodsService) {}

  // getEntrepreneurProfileData(): Observable<any> {
  //   return of(this.profiledata);
  // }
  getEntrepreneurProfileData(): Observable<any> {
    return this.http.method['post'](
      'entrepreneur',
      'get_entrepreneur',
      null
    ).pipe(take(1));
  }
  changeData(data: any) {
    this.data.next(data);
  }
  save(entrepreneurProfileContext: IEntrepreneurProfile): Observable<any> {
    return this.http.method['post'](
      'entrepreneur',
      'update_entrepreneur',
      entrepreneurProfileContext
    ).pipe(take(1));
  }
  /**
   * Submit entreprenure profile details for approval
   *
   * @returns
   */
  submitForApprovalFinal(): Observable<any> {
    return this.http.method['post'](
      'entrepreneur',
      'approval_submit',
      null
    ).pipe(take(1));
  }
}
