import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { InvestorProfileService } from '@app/data/service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestorProfileEditResolver implements Resolve<boolean> {
  constructor(private investorProfileService: InvestorProfileService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.investorProfileService.getInvestorProfileData();
  }
}
