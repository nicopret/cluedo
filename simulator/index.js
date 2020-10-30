const { exit } = require('process');
const rawData = require('./data.json'),
    readLine = require('readline');

let game;

const checkCards = (cards) => {
    console.log(game.current);
    console.log(cards);
    let nextPlayer = JSON.parse(JSON.stringify(game.current));
    for (let i=0; i<game.players; i++) {
        nextPlayer++;
        if (nextPlayer > game.players) nextPlayer = 0;
        const card = Object.values(cards).reduce((result, item) => {
            const index = game.cards[nextPlayer].indexOf(item);
            return index < 0 ? result : game.cards[nextPlayer][index];
        }, null);
        if (card) {
            console.log(`Player ${nextPlayer} shows ${game.current === game.you ? card : 'card'}`);
            i = game.players + 1;
        } else {
            console.log(`Player ${nextPlayer} pass`);
        }
    }
    game.current++;
    if (game.current > game.players) game.current = 0;
}

const createDeck = (excludeArray) => {
    return excludeArray.reduce((result, card) => {
        if (result.people.indexOf(card) > -1) {
            result.people.splice(result.people.indexOf(card), 1);
        }
        if (result.rooms.indexOf(card) > -1) {
            result.rooms.splice(result.rooms.indexOf(card), 1);
        }
        if (result.weapons.indexOf(card) > -1) {
            result.weapons.splice(result.weapons.indexOf(card), 1);
        }
        return result;
    }, JSON.parse(JSON.stringify(rawData)));
}

const draw = () => {
    return {
        person: rawData.people[randomIndex(rawData.people.length)],
        room: rawData.rooms[randomIndex(rawData.rooms.length)],
        weapon:rawData.weapons[randomIndex(rawData.weapons.length)]
    }
}

const randomIndex = (high) => {
    return Math.floor(Math.random() * high);
}

const setupGame = () => {
    game = { cards: {} };
    game.current = 0;
    game.players = randomIndex(3) + 3;
    game.you = randomIndex(game.players);
    game.suspects = draw();
    const deck = rawData.people.concat(rawData.rooms, rawData.weapons).sort();
    deck.splice(deck.indexOf(game.suspects.person), 1);
    deck.splice(deck.indexOf(game.suspects.room), 1);
    deck.splice(deck.indexOf(game.suspects.weapon), 1);
    while (deck.length > 0) {
        if (deck.length >= game.players) {
            for (let i=0; i <= game.players; i++) {
                if (!game.cards[i]) {
                    game.cards[i] = [];
                }
                game.cards[i].push(deck.splice(randomIndex(deck.length), 1)[0]);
            }
        } else {
            game.sideCards = deck.splice(0);
        }
    }    
    game.deck = game.sideCards && game.sideCards.length > 0 ? createDeck(game.sideCards) : rawData;
    console.log(`${game.players + 1} playing, you are player ${game.you}`);
    console.log(`your cards: ${game.cards[game.you]}`);
    console.log(game.sideCards ? `cards out of play: ${game.sideCards}` : 'all cards in play');
}

const guilty = draw();

readLine.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (str.toLowerCase() === 'n') {
        setupGame();
    }
    if (key.name === 'space') {
        checkCards(draw());
    }
    if (key.name === 'return') {
        console.log(game.suspects);
    }
    if (key.sequence === '\x03') {
        exit();
    }
});
