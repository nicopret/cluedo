import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GameService } from '../shared/game.services';

@Component({
    providers: [ GameService ],
    selector: 'app-newgame',
    styleUrls: [ './newgame.page.scss' ],
    templateUrl: './newgame.page.html'
})
export class NewGamePage implements OnInit {
    enableInput: boolean = true;
    cards: any;
    cardsOut: any[];
    cardsOutSelect: any[] = [];
    playerList: any[] = [ 'You' ];
    player: string;
    roomCards: any[] = [];
    suspectCards: any[] = [];
    weaponCards: any[] = [];

    constructor(private gameService: GameService, private modalController: ModalController, private router: Router) {}

    cancel() {
        this.modalController.dismiss();
    }
    
    compareWith(o1, o2) {
        return o1 && o2 ? o1 === o2 : false;
    }

    createGame() {
        const playerCards = this.roomCards.concat(this.suspectCards, this.weaponCards);
        this.modalController.dismiss({
            cardsOut: this.cardsOutSelect,
            playerCards,
            playerList: this.playerList
        });
    }

    ngOnInit() {
        this.cards = this.gameService.getCardDeck();
        this.cardsOut = this.cards.people.concat(this.cards.rooms, this.cards.weapons).sort();
    }

    onInput(): any {
        if (this.player.length > 0) {
            this.playerList.push(this.player);
            this.player = '';
            this.enableInput = this.playerList.length < 6;
        }
    }

    onRenderItems(event) {
        const draggedItem = this.playerList.splice(event.detail.from, 1)[0];
        this.playerList.splice(event.detail.to, 0, draggedItem);
        event.detail.complete();
    }
}
