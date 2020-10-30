import { Injectable } from '@angular/core';

import cardData from '../../assets/data.json';

@Injectable()
export class GameService {
    game: any = {};

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
        console.log(this.game);
    }

    getCardDeck() {
        return JSON.parse(JSON.stringify(cardData));
    }
}
