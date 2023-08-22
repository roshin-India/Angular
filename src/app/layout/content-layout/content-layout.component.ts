import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

import { themes } from '@core/constants/themes';
import { ThemeService } from '@core/service/theme.service';
import { feUrl } from '@app/core/constants/common';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  navOneItems = [
    { link: feUrl.home, title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];
  // currentTheme: string;

  // private overlayContainer: OverlayContainer;

  // currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
  //   map((isDarkTheme: boolean) => {
  //     const [lightTheme, darkTheme] = themes;

  //     this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

  //     if (this.overlayContainer) {
  //       const overlayContainerClasses = this.overlayContainer.getContainerElement()
  //         .classList;
  //       const themeClassesToRemove = Array.from(
  //         overlayContainerClasses
  //       ).filter((item: string) => item.includes('-theme'));
  //       if (themeClassesToRemove.length) {
  //         overlayContainerClasses.remove(...themeClassesToRemove);
  //       }
  //       overlayContainerClasses.add(this.currentTheme);
  //     }

  //     return this.currentTheme;
  //   })
  // );

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  // ngOnInit(): void {
  //   if (this.overlayContainer) {
  //     this.overlayContainer
  //       .getContainerElement()
  //       .classList.add(this.currentTheme);
  //   }
  // }
}
