import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AUTH } from '@app/core/constants/module';
import { AuthService } from '@app/core/service/auth.service';
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-nav-two',
  templateUrl: './nav-two.component.html',
  styleUrls: ['./nav-two.component.scss']
})
export class NavTwoComponent {
  @Input() navMenu: any[];
  @Output() event = new EventEmitter<IPresentationEvent>();

  /**
   * Path
   */
  strLoginPath = AUTH.pathLogin;
  stRegistrationPath = AUTH.pathRegistration;
  constructor() {}

  logout() {
    this.event.emit({
      type: 'LOGOUT'
    });
  }
}
