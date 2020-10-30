const fs = require('fs');

const data = {
    people: [ 'Plum', 'White', 'Scarlet', 'Green', 'Mustard', 'Peacock' ],
    rooms: [ 'Courtyard', 'Games Room', 'Study', 'Dining Room', 'Garage', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom' ],
    weapons: [ 'Rope', 'Dagger', 'Wrench', 'Pistol', 'Candlestick', 'Lead Pipe' ]
}

fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
