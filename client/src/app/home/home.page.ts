import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameService } from '../shared/game.services';

import { NewGamePage } from '../newgame/newgame.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  deck: any = {};
  players: any[] = [];

  constructor(private gameService: GameService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.createBoard({
      cardsOut: [ "Dining Room", "Lead Pipe", "Plum" ],
      playerCards: [ "Games Room", "Peacock", "Pistol" ],
      playerList: [ "0", "You", "2", "3", "4" ]
    });
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: NewGamePage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.createBoard(data);
  }

  createBoard = (input) => {
    let cards = this.gameService.getCardDeck();
    const you = input.playerList.indexOf('You');
    this.players = input.playerList;
    this.deck.people = this.createGroup(cards.people, input.cardsOut, input.playerList.length, you, input.playerCards);
    this.deck.rooms = this.createGroup(cards.rooms, input.cardsOut, input.playerList.length, you, input.playerCards);
    this.deck.weapons = this.createGroup(cards.weapons, input.cardsOut, input.playerList.length, you, input.playerCards);
  }

  createGroup = (cards, cardsOut, playerCount, you, ownCards) => {
    return cards.reduce((result, item) => {
      let card = {
        claimed: cardsOut.indexOf(item) >= 0,
        key: item,
        players: new Array(playerCount).fill(' ')
      };
      if (ownCards.indexOf(item) >= 0) {
        card.claimed = true;
        card.players[you] = 'c';
      }
      result.push(card);
      return result;
    }, []);
  }
}
