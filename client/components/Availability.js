import React from 'react';

const sortByTime = (a, b)=>{

  //if hours are equal sort by minutes
  if (a.hour === b.hour){
    return a.minute - b.minute;
  }

  //sort by hours
  return a.hour - b.hour;

}


const militaryTimeConverter = (times)=>{
  
  return times.map((time) => {
    var ampm;
    var stringTime;

    //convert times to AM/PM string based on time of day
    if (time.hour > 12){
      ampm = time.hour-12;
      stringTime = String(ampm) + ':' + String(time.minute || '00') + ' PM';

    } else if (time.hour < 12 && time.hour !== 0){
      ampm = time.hour;
      stringTime = String(ampm) + ':' + String(time.minute || '00') + ' AM';

    } else if (time.hour === 12 || time.hour === 0){
      ampm = 12;
      stringTime = String(ampm) + ':' + String(time.minute || '00') + (time.hour ? ' PM' : ' AM');
    }
   
   //add property to each object
   time.time = stringTime;

   return time; //return updated time object
  });

}


var Availability = (props)=>{
  
  let showTables = props.tables.length > 0; //check if there are available tables

  if (showTables){
    
    let available = militaryTimeConverter(props.tables); //add AM/PM strings for user friendly display on reservation widget
    available.sort(sortByTime); //sort array in place by times;

    return (<div className="slots">
             {available.map((table, index) => <a index={index} className="confirmation" href={`${PATH}/confirmation.html`} target="_blank"><div className="table"> {`${table.time}`} </div></a>)}
           </div>)
  }

  return (<div className="slots"> Sorry! No tables available :( </div>)

}

export default Availability;