import { Component } from '@angular/core';

@Component({
    selector: 'app-newgame',
    styleUrls: [ './newgame.page.scss' ],
    templateUrl: './newgame.page.html'
})
export class NewGamePage {
    disableInput: boolean = false;
    listItems: any[] = [ 'You' ];
    player: string;

    constructor() {}

    onInput(): any {
        if (this.player.length > 0) {
            this.listItems.push(this.player);
            this.player = '';
            this.disableInput = this.listItems.length > 5;
        }
    }

    onRenderItems(event) {
        const draggedItem = this.listItems.splice(event.detail.from, 1)[0];
        this.listItems.splice(event.detail.to, 0, draggedItem);
        event.detail.complete();
    }
}
