let minIncrements = [0, 15, 30, 45];
let availibilitySlots = [];

for (let day = 1; day <= 31; day++) {
    for (let hour = 1; hour <= 24; hour++){
        for (let i = 0; i < minIncrements.length; i++){ // generates 2976 possibilites
            let min = minIncrements[i];
            // console.log(`${day}-${hour}-${min}`);
            availibilitySlots.push({
                day, 
                hour,
                min
            }); 
        }
    }
}

console.log(typeof availibilitySlots[availibilitySlots.length -1].day);

module.exports.availibilitySlots = availibilitySlots;