import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CardService } from '../shared/card.service';

@Component({
    selector: 'app-edit',
    styleUrls: [ './edit.component.scss' ],
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

    deck;

    constructor(private cardService: CardService, private router: Router) {}

    ngOnInit() {
        this.cardService.getCards().subscribe(cards => {
            console.log(cards);
            this.deck = cards;
        });
    }

    cancel() {
        this.router.navigate(['home']);
    }

    save() {
        this.cardService.setCards(this.deck);
        this.cancel();
    }

}
