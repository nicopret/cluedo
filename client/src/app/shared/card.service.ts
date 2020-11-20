import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

import cardData from '../../assets/data.json';

@Injectable()
export class CardService {

    private deck = new BehaviorSubject<any>({});

    constructor(private storage: Storage) {
        storage.get('board').then(board => {
            if (!board) {
                board = this.sortCards(cardData);
            }
            this.setCards(board);
        });
    }

    getCards(): Observable<any> {
        return this.deck.asObservable();
    }

    setCards(cards: any) {
        this.storage.set('board', this.sortCards(cards));
        this.deck.next(this.sortCards(cards));
    }

    sortCards(cards: any) {
        cards.people.sort();
        cards.rooms.sort();
        cards.weapons.sort();
        return cards;
    }
}
