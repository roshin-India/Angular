import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { feUrl } from '../constants/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.checkIfLoggedIn()) {
      if (
        state.url !== feUrl.login &&
        state.url !== feUrl.home &&
        state.url !== feUrl.registration
      )
        return this.router.parseUrl(feUrl.login);
      else return true;
    } else {
      const { userStatus, type } = this.authService.getLocalStorage();
      const status = type + '-' + userStatus;
      console.log('status', status);

      switch (status.trim()) {
        case '1-V':
          if (!state.url.includes(feUrl.investorProfile))
            return this.router.parseUrl(feUrl.investorProfile);
          else return true;
        case '1-U':
          if (state.url !== feUrl.investorProfileView)
            return this.router.parseUrl(feUrl.investorProfileView);
          else return true;

        case '2-V':
          if (!state.url.includes(feUrl.entrepreneurProfile))
            return this.router.parseUrl(feUrl.entrepreneurProfile);
          else return true;

        case '2-U':
          if (state.url !== feUrl.entrepreneurProfileView)
            return this.router.parseUrl(feUrl.entrepreneurProfileView);
          else return true;

        default:
          return true;
      }
    }
  }
}
