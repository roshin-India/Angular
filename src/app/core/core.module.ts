import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guard/auth.guard';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';

import { TokenInterceptor } from './interceptor/token.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
