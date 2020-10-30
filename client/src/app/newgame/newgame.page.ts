import { Component } from '@angular/core';

@Component({
    selector: 'app-newgame',
    styleUrls: [ './newgame.page.scss' ],
    templateUrl: './newgame.page.html'
})
export class NewGamePage {
    listItems: any[] = [ 'You', 'One', 'Two', 'Three' ];

    constructor() {}

    onRenderItems(event) {
        const draggedItem = this.listItems.splice(event.detail.from, 1)[0];
        this.listItems.splice(event.detail.to, 0, draggedItem);
        event.detail.complete();
        this.listItems.push('Four');
    }
}