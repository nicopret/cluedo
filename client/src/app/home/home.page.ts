import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameService } from '../shared/game.services';

import { NewGamePage } from '../newgame/newgame.page';
import { OptionsModal } from '../options/options.modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cardCount: number = 0;
  deck: any = {};
  playerList: any[] = [];
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
    this.playerList = this.players.map((name, index) => {
      return {
        display: index, name, sum: this.deck.people.concat(this.deck.rooms, this.deck.weapons).reduce((sum, item) => {
          return item.players[index] === 'c' ? sum + 1 : sum;
        }, 0)
      }
    });
    this.cardCount = this.playerList[you].sum;
  }

  createGroup = (cards, cardsOut, playerCount, you, ownCards) => {
    return cards.reduce((result, item) => {
      let card = {
        claimed: cardsOut.indexOf(item) >= 0,
        key: item,
        players: new Array(playerCount).fill('')
      };
      if (ownCards.indexOf(item) >= 0) {
        card.claimed = true;
        card.players[you] = 'c';
      }
      result.push(card);
      return result;
    }, []);
  }

  getAvailableCards(card) {
    return this.deck.people.concat(this.deck.rooms, this.deck.weapons)
      .filter((item) => !item.claimed && !item.status)
      .map((item) => item.key)
      .filter((item) => item !== card)
      .sort();
  }

  updateDeck(array, card, input) {
    let item = array.find((item) => item.key === card);
    if (item) {
      item.claimed = input.claimed;
      item.players[input.player] = input.value;
    }
    if (item && input.value === 'c') {
      item.players.forEach((value, index) => {
        item.players[index] = value !== 'c' ? '' : value;
      });
    }
  }

  async updatePlayer(input) {
    const { card, player } = input;
    const availableCards = this.getAvailableCards(card.key);
    const modal = await this.modalController.create({
      component: OptionsModal,
      componentProps: { availableCards, card, name: this.players[player], player }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.updateDeck(this.deck.people, card.key, data);
    this.updateDeck(this.deck.rooms, card.key, data);
    this.updateDeck(this.deck.weapons, card.key, data);
    if (data.shared && data.shared.length > 0) {
      this.updateShared(data, card.key);
    }
  }

  updateShared(input, card) {
    const max = this.deck.people.concat(this.deck.rooms, this.deck.weapons).reduce((value, item) => {
      const shared = item.players[input.player];
      const max = !shared || shared.trim() === '' ? 1 : parseInt(shared.split(',').sort().reverse()[0], 10) + 1;
      return max > value ? max : value;
    }, 1);
    this.deck.people.forEach((item) => {
      if (item.key === card || input.shared.indexOf(item.key) >= 0) {
        let values = item.players[input.player].trim().length === 0 ? [] : item.players[input.player].trim().split(',').filter((count) => count !== '0');
        values.push(max.toString());
        item.players[input.player] = values.sort().join(', ');
      }
    });
    this.deck.rooms.forEach((item) => {
      if (item.key === card || input.shared.indexOf(item.key) >= 0) {
        let values = item.players[input.player].trim().length === 0 ? [] : item.players[input.player].trim().split(',').filter((count) => count !== '0');
        values.push(max.toString());
        item.players[input.player] = values.sort().join(', ');
      }
    });
    this.deck.weapons.forEach((item) => {
      if (item.key === card || input.shared.indexOf(item.key) >= 0) {
        let values = item.players[input.player].trim().length === 0 ? [] : item.players[input.player].trim().split(',').filter((count) => count !== '0');
        values.push(max.toString());
        item.players[input.player] = values.sort().join(', ');
      }
    });
  }

  updateStatus(card) {
    card.status = !card.status;
  }

}
