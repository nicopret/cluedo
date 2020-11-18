import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './card/card.component';
import { GameService } from './shared/game.services';
import { HomePage } from './home/home.page';
import { NewGamePage } from './newgame/newgame.page';
import { OptionsModal } from './options/options.modal';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [AppComponent, CardComponent, HomePage, NewGamePage, OptionsModal, PlayerComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), IonicStorageModule.forRoot({
    name: '_storage', driverOrder: [ 'localstorage' ]
  }), AppRoutingModule],
  providers: [
    GameService, SplashScreen, StatusBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
