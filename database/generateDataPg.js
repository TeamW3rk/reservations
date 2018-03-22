var faker = require('faker');
let counter = 0;
let minIncrements = [0, 15, 30, 45];
let availibilitySlots = [];

for (let day = 1; day <= 31; day++) {
    for (let hour = 1; hour <= 24; hour++){
        for (let i = 0; i < minIncrements.length; i++){ // generates 2976 possibilites
            counter++;
            let min = minIncrements[i];
            // console.log(`${day}-${hour}-${min}`);
            availibilitySlots.push({
                id: counter,
                day, 
                hour,
                min
            }); 
        }
    }
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function generateRestaurantName () {
    return faker.company.companyName()
}

module.exports.randomInt = randomInt
module.exports.availibilitySlots = availibilitySlots;
module.exports.generateRestaurantName = generateRestaurantName;
