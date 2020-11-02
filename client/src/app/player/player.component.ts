import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-player',
    styleUrls: [ './player.component.scss' ],
    templateUrl: './player.component.html'
})
export class PlayerComponent {
    @Input() index;
    @Input() player;
    @Output() updatePlayer = new EventEmitter();

    update() {
        this.updatePlayer.emit(this.index);
    }
}
