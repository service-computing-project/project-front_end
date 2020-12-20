import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthenticationService } from './_service/authentication.service';
import { JwtInterceptor } from './_service/jwt.interceptor';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
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
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

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
  NzLayoutModule,
  NzBreadCrumbModule,
  NzTypographyModule,
  NzSpaceModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ContentComponent,
    UserComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...nzSharedModules,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
