import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ContentLayoutTwoComponent } from './layout/content-layout-two/content-layout-two.component';
import { NavComponent } from './layout/nav/nav.component';
import { NavTwoComponent } from './layout/nav-two/nav-two.component';
import { FooterComponent } from './layout/footer/footer.component';

import { AuthModule } from '@modules/auth/auth.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    NavComponent,
    FooterComponent,
    AuthLayoutComponent,
    NavTwoComponent,
    ContentLayoutTwoComponent
  ],
  imports: [
    // angular
    BrowserModule,

    // 3rd party
    // AuthModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,

    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
