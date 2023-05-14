import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
//end
//services
import { EngineHandlerService } from './services/engine-handler.service';
import { HelperService } from './services/helper.service';
import { UrlProviderService } from './services/url-provider.service';
//end
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { PrayerModalComponent } from './prayer-modal/prayer-modal.component';
import { PsaumeModalComponent } from './psaume-modal/psaume-modal.component';
import { HowComponent } from './how/how.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    PrayerModalComponent,
    PsaumeModalComponent,
    HowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [EngineHandlerService, HelperService, UrlProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
