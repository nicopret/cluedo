import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import cardData from '../../assets/data.json';

@Injectable()
export class GameService {
    game: any = {};

    cards = new Subject();

    constructor() {
        cardData.people.sort();
        cardData.rooms.sort();
        cardData.weapons.sort();
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
        return JSON.parse(JSON.stringify(cardData));
    }
}
