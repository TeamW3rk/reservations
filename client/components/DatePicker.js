import React from 'react';
import "jquery-ui/ui/widgets/datepicker";

var DatePicker = ()=>{

  $(function(){
    $('#datepicker').datepicker();
  });

  return(<div>
          <label for="datepicker" className="form-datepicker">Date</label>
            <div>
              <input className="custom-select datepicker" id="datepicker"/>
            </div>
        </div>);

}

export default DatePicker;