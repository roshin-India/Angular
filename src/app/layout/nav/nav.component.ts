import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '@core/service/theme.service';
import { environment } from '@env';
import { AUTH } from '@app/core/constants/module';
import { feUrl } from '@app/core/constants/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() navMenu: any[];

  public version = environment.version;
  public repoUrl = '';

  public isDarkTheme$: Observable<boolean>;

  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
