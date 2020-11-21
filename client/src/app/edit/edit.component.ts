import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../shared/card.service';

@Component({
    selector: 'app-edit',
    styleUrls: [ './edit.component.scss' ],
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

    deck;

    room;
    suspect;
    weapon;

    rooms = new FormArray([]);
    suspects = new FormArray([]);
    weapons = new FormArray([]);

    constructor(private cardService: CardService, private router: Router) {}

    ngOnInit() {
        this.cardService.getCards().subscribe(cards => {
            this.deck = cards;
            if (cards && cards.people) {
                this.suspects = new FormArray(cards.people.map((person) => new FormControl(person)));
            }
            if (cards && cards.rooms) {
                this.rooms = new FormArray(cards.rooms.map((room) => new FormControl(room)));
            }
            if (cards && cards.weapons) {
                this.weapons = new FormArray(cards.weapons.map((weapon) => new FormControl(weapon)));
            }
        });
    }

    addRoom() {
        this.rooms.push(new FormControl(this.room));
        this.room = '';
    }

    addSuspect() {
        this.suspects.push(new FormControl(this.suspect));
        this.suspect = '';
    }

    addWeapon() {
        this.weapons.push(new FormControl(this.weapon));
        this.weapon = '';
    }

    cancel() {
        this.router.navigate(['home']);
    }

    removeRoom(index: number) {
        this.rooms.removeAt(index);
    }

    removeSuspect(index: number) {
        this.suspects.removeAt(index);
    }

    removeWeapon(index: number) {
        this.weapons.removeAt(index);
    }

    save() {
        const rooms = this.rooms.value;
        const people = this.suspects.value;
        const weapons = this.weapons.value;
        this.cardService.setCards({ rooms, people, weapons });
        this.cancel();
    }

}
