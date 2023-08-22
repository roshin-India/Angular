import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { of, Subject } from 'rxjs';

import { SimpleChanges, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { InvestorModelComponent } from '../../presentations/investor-model/investor-model.component';
import { InvestorService } from '../../investor.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-investor-profile-edit',
  templateUrl: './investor-profile-edit.component.html',
  styleUrls: ['./investor-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorProfileEditComponent
  implements OnInit, OnDestroy, OnChanges {
  destroySubject$ = new Subject();
  objInvestorProfileForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private investorService: InvestorService,
    private detectChange: ChangeDetectorRef
  ) {
    this.investorService
      .getInvestorProfileData()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(({ formGroup }) => {
        this.objInvestorProfileForm = formGroup;
        this.detectChange.detectChanges();
      });
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
  /**
   * Open dialogue
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(InvestorModelComponent, {
      width: '75vw',
      height: '75vh',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
