import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzCardModule,
  MzNavbarModule,
  MzInputModule,
  MzButtonModule,
  MzSelectModule,
  MzIconModule,
  MzIconMdiModule,
  MzDropdownModule,
  MzModalModule,
  MzToastModule,
  MzTooltipModule  } from 'ngx-materialize';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MzCardModule,
    MzNavbarModule,
    MzInputModule,
    MzButtonModule,
    MzSelectModule,
    MzIconModule,
    MzIconMdiModule,
    MzDropdownModule,
    MzModalModule,
    MzToastModule,
    MzTooltipModule
  ],
  exports: [
    MzCardModule,
    MzNavbarModule,
    MzInputModule,
    MzButtonModule,
    MzSelectModule,
    MzIconModule,
    MzIconMdiModule,
    MzDropdownModule,
    MzModalModule,
    MzToastModule,
    MzTooltipModule]
})
export class SharedModule { }
