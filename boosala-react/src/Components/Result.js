import React, { Component } from 'react';
import './../css/Result.css';
import logo from './../images/logo.png';
import face from './../images/faceEn.jpeg';
import arrowLeft from './../images/arrowLeft.png';
//import $ from 'jquery'
import Search from './Search';


class Result extends Component {

  constructor(props){
    super(props);
    this.backToSearch = this.backToSearch.bind(this);
    this.state = {
      language: this.props.language,
      message:{
        english: ['have been located at', 'on'],
        arabic: ['عثرنا على', 'في', 'يوم']
      },
      userName: this.props.userName,
      their: this.props.their,
      // placeholders Just for testing
      location:{
        english: 'Diavata Refugee Camp',
        arabic: 'مخيم ديافاتا للاجئين'
      },
      datetime:{
        english: 'Monday, 29 March 2018',
        arabic: 'الاثنين ، 29 مارس 2018'
      },     
      /*End placeholders*/ 
      current: "result",
      backgroundColor: "white"
    }
  }

  backToSearch(){
    this.setState({current: "search"});
  }

  renderMessage(){
    if (this.state.language==="english")
        return(
            this.state.their +" "+ this.state.message[this.state.language][0] +" "+ this.state.location[this.state.language] +" "+ this.state.message[this.state.language][1] +" "+ this.state.datetime[this.state.language]
        )
    else
        return(
                this.state.message[this.state.language][0] +" "+ this.state.their  +" "+ this.state.message[this.state.language][1] +" "+ this.state.location[this.state.language]  +" "+ this.state.datetime[this.state.language]
            )
  }

  loadResult(){
    return (
        <div className="Resultpage">
            <a id="back" onClick={this.backToSearch}><img src={arrowLeft} alt="go-back" /></a>        
            <div id="pictures-div" className="column">
                <img id="logo" src={logo} alt="boosala logo"/>
                <img id="face" src={face} alt="face"/>
            </div>
            <div id="result" className="column">
                <div id="message" className={this.state.language==="arabic" ? "ArTextDirection" : " "}>
                    {this.renderMessage()}
                </div>
                <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193835.64056961474!2d22.610370330120745!3d40.61484182735925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a8239426b56d49%3A0x9199527528e1b37a!2sDelta%2C+Greece!5e0!3m2!1sen!2sae!4v1524960474195" width="690" height="350" frameBorder="0" allowFullScreen></iframe>
            </div>
        </div>
    );
  }

  render() {
    return (
      <div className="Result">
        {this.state.current === "result" ? this.loadResult() : null}
        {this.state.current === "search" ? <Search language={this.state.language}/> : null}
      </div>
    );
  }

}

export default Result;
