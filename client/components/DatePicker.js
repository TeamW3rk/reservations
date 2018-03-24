import React from 'react';
import "jquery-ui/ui/widgets/datepicker";

class DatePicker extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      date: (new Date()).toLocaleDateString()
    }
  }

  componentWillMount(){
    this.props.changeDate(this.state.date);
  }
 
  handleChange(event){
    this.setState({date: event /*event.target.value*/ });
  }

  render(){

    //handle jquery UI date picker and triggers
    let context = this;
    $(function(){
      $('#datepicker').datepicker({
        onSelect: (dateText)=> {
          context.handleChange(dateText); //change date in model
          context.props.changeDate(dateText); //trigger a date change in main app
        }
      });
    });

    return(<div>
            <label className="form-datepicker"> Date </label>
                <input readOnly value={this.state.date} className="custom-select datepicker" id="datepicker"/>
          </div>);
  }

}

export default DatePicker;