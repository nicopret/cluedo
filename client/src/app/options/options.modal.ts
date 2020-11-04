import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-options',
    styleUrls: [ './options.modal.scss' ],
    templateUrl: './options.modal.html'
})
export class OptionsModal implements OnInit {
    @Input() availableCards;
    @Input() card;
    @Input() name;
    @Input() player;

    available: any[] = [];
    claimed: boolean = false;
    free: boolean = false;
    originalValue: string;
    sharedCards: any[] = [];
    value: string;

    constructor(private modalController: ModalController) {}

    ngOnInit() {
        this.available = this.availableCards;
        this.claimed = this.card.claimed;
        this.free = this.card.players[this.player] === '0'
        this.value = this.card.players[this.player];
        this.originalValue = JSON.parse(JSON.stringify(this.value));
    }

    clear() {
        this.modalController.dismiss({
            claimed: false,
            player: this.player,
            value: ''
        });
    }

    close() {
        this.modalController.dismiss({
            claimed: this.claimed,
            forceUpdate: this.value !== this.originalValue,
            player: this.player,
            shared: this.sharedCards,
            value: this.value
        });
    }

    toggleClaim() {
        this.claimed = !this.claimed;
        if (this.claimed) {
            this.free = false;
        }
        this.value = this.claimed ? 'c' : '';
    }

    toggleFree() {
        this.free = !this.free;
        if (this.free) {
            this.claimed = false;
        }
        this.value = this.free ? '0' : '';
    }
}
