import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRadioModule } from 'ng-zorro-antd/radio';

const nzSharedModules = [
  NzDropDownModule,
  NzSpinModule,
  NzBadgeModule,
  NzAlertModule,
  NzFormModule,
  NzInputModule,
  NzCheckboxModule,
  NzButtonModule,
  NzMessageModule,
  NzDividerModule,
  NzEmptyModule,
  NzSkeletonModule,
  NzTagModule,
  NzPaginationModule,
  NzToolTipModule,
  NzPopoverModule,
  NzProgressModule,
  NzTableModule,
  NzModalModule,
  NzBackTopModule,
  NzIconModule,
  NzSelectModule,
  NzStatisticModule,
  NzUploadModule,
  NzRadioModule,
  NzCollapseModule,
  NzInputNumberModule,
  NzNotificationModule,
  NzCardModule,
  NzCarouselModule,
  NzAvatarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...nzSharedModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
