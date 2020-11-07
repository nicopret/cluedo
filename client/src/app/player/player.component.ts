import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-player',
    styleUrls: [ './player.component.scss' ],
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnChanges {
    @Input() claimed = false;
    @Input() complete = false;
    @Input() index;
    @Input() player;

    @Output() updatePlayer = new EventEmitter();

    owner: boolean = false;
    shadow: boolean = false;

    calculateDisplay() {
        this.owner = this.player === 'c';
        if (this.owner) {
            this.complete = false;            
        }
        
        if (this.complete) {
            this.claimed = false;
        }

        if (!this.claimed && !this.complete && !this.owner) {
//            this.shadow = this.index % 2 === 0
        }
    }

    ngOnChanges() {
        this.calculateDisplay();
    }

    ngOnInit() {
        this.calculateDisplay();
    }

    update() {
        this.updatePlayer.emit(this.index);
    }
}
