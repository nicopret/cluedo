import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './card/card.component';
import { EditComponent } from './edit/edit.component';
import { GameService } from './shared/game.services';
import { HomePage } from './home/home.page';
import { NewGamePage } from './newgame/newgame.page';
import { OptionsModal } from './options/options.modal';
import { PlayerComponent } from './player/player.component';
import { CardService } from './shared/card.service';

@NgModule({
  declarations: [AppComponent, CardComponent, EditComponent, HomePage, NewGamePage, OptionsModal, PlayerComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), IonicStorageModule.forRoot({
    name: '_storage', driverOrder: [ 'localstorage' ]
  }), AppRoutingModule, ReactiveFormsModule ],
  providers: [ CardService, GameService, GoogleAnalytics, SplashScreen, StatusBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
