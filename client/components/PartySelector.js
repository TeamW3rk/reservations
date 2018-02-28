import React from 'react';

var PartySelector = ()=>{
  var options = [];
  for(var i=1; i<= 20; i++){
    options.push(i);
  }

  return(<div>
          <label for="party-size" className="form-party-size">Party Size</label>
            <select className="custom-select party-size" id="party-size">
              {options.map((val)=>(<option value={val}> {val} </option>))}
            </select>
        </div>);

}

export default PartySelector;