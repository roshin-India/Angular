import { IPresentationEvent } from './../schema/events';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpMethodsService } from '@app/core/service/http-methods.service';
import { IInvestorProfile } from '@app/data/schema/investor-profile';
import { of, Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import * as profiledata from './json/mydata.json';

@Injectable({
  providedIn: 'root'
})
export class InvestorProfileService {
  profiledata: any = (profiledata as any).default;
  data = new Subject();
  investorProfileData$ = this.data.asObservable();
  constructor(private http: HttpMethodsService) {}
  // getInvestorProfileData(): Observable<any> {
  //   return of(this.profiledata);
  // }
  getInvestorProfileData(): Observable<any> {
    return this.http.method['post']('invester', 'get_investor', null).pipe(
      take(1)
    );
  }
  changeData(data: any) {
    this.data.next(data);
  }

  /**
   * Save investor
   *
   * @param investerProfileContext
   * @returns
   */
  save(investerProfileContext: IInvestorProfile): Observable<any> {
    return this.http.method['post'](
      'invester',
      'update_investor',
      investerProfileContext
    ).pipe(take(1));
  }

  /**
   * Submit investor profile details for approval
   *
   * @returns
   */
  submitForApprovalFinal(): Observable<any> {
    return this.http.method['post']('invester', 'approval_submit', null).pipe(
      take(1)
    );
  }
}
