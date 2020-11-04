import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-card',
    styleUrls: [ './card.component.scss' ],
    templateUrl: './card.component.html'
})
export class CardComponent {
    @Input() card;

    @Output() updatePlayer = new EventEmitter();
    @Output() updateStatus = new EventEmitter();

    status() {
        this.updateStatus.emit(this.card);
    }

    update(playerIndex) {
        this.updatePlayer.emit({
            card: this.card,
            player: playerIndex
        });
    }
}
