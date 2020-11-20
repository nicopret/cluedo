import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Storage } from '@ionic/storage';

import cardData from '../../assets/data.json';
@Injectable()
export class GameService {

    data;
    game: any = {};

    cards = new Subject();

    constructor(private storage: Storage) {
        this.storage.get('board').then(value => {
            if (!value) {
                this.data = cardData;
                this.storage.set('board', cardData);
            } else {
                this.data = value;
            }
        });
    }

    createGame(cardsOut, hand, players) {
        this.game.cardsOut = cardsOut;
        this.game.playerOrder = players;
        this.game.players = {};
        players.forEach((player) => this.game.players[player] = []);
        this.game.players['You'] = hand;

        this.game.deck = {
            people: cardData.people.filter((item) => cardsOut.indexOf(item) < 0).sort(),
            rooms: cardData.rooms.filter((item) => cardsOut.indexOf(item) < 0).sort(),
            weapons: cardData.weapons.filter((item) => cardsOut.indexOf(item) < 0).sort()
        };

        this.cards.next(this.game.deck);
    }

    getCardDeck() {
        this.data.people.sort();
        this.data.rooms.sort();
        this.data.weapons.sort();
        return JSON.parse(JSON.stringify(this.data));
    }
}
