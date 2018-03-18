let minIncrements = [0, 15, 30, 45];

let avail = [];

for (let day = 1; day <= 31; day++) {
    for (let hour = 1; hour <= 24; hour++){
        for (let i = 0; i < minIncrements.length; i++){
            let min = minIncrements[i];
            // console.log(`${day}-${hour}-${min}`);
            avail.push(`${day}-${hour}-${min}`); // generates 2976 possibilites
        }
    }
}

console.log(avail.length);