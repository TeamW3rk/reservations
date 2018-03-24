import React from 'react';
import ReactDom from 'react-dom';
import PartySelector from './PartySelector';
import DatePicker from './DatePicker';
import TimeSelector from './TimeSelector';
import Availability from './Availability';
import $ from 'jquery';
import CONFIG from '../../config.client.js';

const ENV = window.ENV = 'TEST'; // Define current enironment
const PATH = window.PATH = CONFIG[ENV].HOST + ":" + CONFIG[ENV].PORT;

window.$ = window.jQuery = $;

class Reservations extends React.Component {
  
  constructor(props){
    super(props);

    //updateTime & updateDate called via DatePicker/TimeSelector components to initialize values
    this.state = {
      time: null, 
      date: null,
      availability: [],
      showTables: false,
      bookingCount: 0,
      animate: false
    }
  }

  componentWillMount(){
    this.fetchBookings();
  }


  updateTime(time){
    this.setState({time:time});
  }

  updateDate(date){
    this.setState({date:date});
  }

  fetchTimes(){
    const path = window.location.pathname;
    const pathId = path.split('/')[2];
    
    $.ajax({
      url: `${PATH}/r/${pathId}/reservations`,
      method: 'GET',
      contentType: 'application/json',
      data: JSON.stringify(this.state),
      success: (data)=>{
        console.log('Success! Data was received:', data);
        this.setState({availability:data, showTables:true});
      },
      error: (error)=>{
        //Only display console logs in jest tests
        if (typeof jest === undefined){
          console.log('Error! Data was NOT received:', error);
        }
      }
    });   
  }

  fetchBookings(){
    const path = window.location.pathname;
    const pathId = path.split('/')[2];

    $.ajax({
      url: `${PATH}/r/${pathId}/bookings`,
      method: 'GET',
      contentType: 'application/json',
      success: (data)=>{
        console.log('Success! Booking data  received:', data);

        let day = new Date(this.state.date).getUTCDate();
        console.log(day, 'dayyyyy');
        console.log(data)
        this.setState({bookingCount: data[day-1].bookings_count}); //set booking count from server
      },
      error: (error)=>{
        //Only display console logs in jest tests
        if (typeof jest === undefined){
          console.log('Error! Data was NOT received:', error);
        }
      }
    }); 
  }
  
  //handles logic for animation and table availability fetching
  loadTables(e){
    e.preventDefault();
    this.setState({animate:true});
    setTimeout(()=>{this.setState({animate:false}); this.fetchTimes();}, 800);

  }

  render () {
    return (<div className="container reservation-widget">
              <h5 className="header"><span className="title">Make a reservation</span></h5>
                <form>
                  <div className="form-group">
                    <PartySelector />
                    <div className="picker">
                      <DatePicker changeDate={this.updateDate.bind(this)}/>
                      <TimeSelector changeTime={this.updateTime.bind(this)}/>
                    </div>
                  </div>
                  <button className="findtable" onClick={(e)=>{this.loadTables(e);}} >Find a Table</button>
                  <div className={this.state.animate ? '' : 'hide'} id="loader"></div>
                </form>
                {this.state.showTables && <Availability tables={this.state.availability}/>}
                <div className="bookingcount"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>{` Booked ${this.state.bookingCount} times today`}</div>
            </div>);
  }
}

export default Reservations;