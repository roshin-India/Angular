import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { feUrl } from '@app/core/constants/common';
import { AuthService } from '@app/core/service/auth.service';
import { IPresentationEvent } from '@app/data/schema';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-content-layout-two',
  templateUrl: './content-layout-two.component.html',
  styleUrls: ['./content-layout-two.component.scss']
})
export class ContentLayoutTwoComponent {
  nav2Items = [
    { link: feUrl.home, title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  handleEventFromPresentation(objEvent: IPresentationEvent) {
    switch (objEvent.type) {
      case 'LOGOUT':
        this.authService
          .logout()
          .pipe(
            take(1),
            tap(() => {
              this.router.navigate([feUrl.home]);
              // window.location.reload();
            }),
            catchError(err => {
              this.authService.authErrorHandler(err.error);
              return of(err);
            })
          )
          .subscribe();
        break;
      default:
        break;
    }
  }
}
