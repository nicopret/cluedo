import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-player',
    styleUrls: [ './player.component.scss' ],
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnChanges {
    @Input() index;
    @Input() player;
    @Output() updatePlayer = new EventEmitter();

    shadow;

    ngOnChanges() {
        this.shadow = this.index % 2 === 0 && this.player !== 'c';
    }

    ngOnInit() {
        this.shadow = this.index % 2 === 0 && this.player !== 'c';
    }

    update() {
        this.updatePlayer.emit(this.index);
    }
}
