import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './core/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public loadingService: LoadingService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(blnShowSpinner => {
      if (blnShowSpinner) this.spinner.show();
      else this.spinner.hide();
    });
  }
}
