import React, { Component } from 'react';
import './../css/Search.css';
import logo from './../images/logo.png';
import faceEn from './../images/faceEn.jpeg';
import faceAr from './../images/faceAr.jpg';
import arrowLeft from './../images/arrowLeft.png';
//import $ from 'jquery'
import App from './App';
import Result from './Result';


class Search extends Component {

  constructor(props){
    super(props);
    this.backToHome = this.backToHome.bind(this);
    this.loadResult = this.loadResult.bind(this);
    this.updateUserNameValue = this.updateUserNameValue.bind(this);
    this.updateTheirValue = this.updateTheirValue.bind(this);
    this.state = {
      language: this.props.language,
      text:{
        english: ['My name is', 'Your name', 'and', 'I\'m looking for', 'Their name'],
        arabic: ['اسمي', 'الاسم', '', 'وأبحث عن', 'اسم المفقود']
      },
      findButton: {
        english: 'Find',
        arabic: 'ابحث'
      },
      face: {
        english: faceEn,
        arabic: faceAr
      },
      userName: null,
      their: null,
      location: null,
      datetime: null,
      current: "search",
      backgroundColor: "white"
    }
  }

  backToHome(){
    this.setState({current: "home"});
  }

  loadResult(){
    this.setState({current: "result", 
        their: this.state.their, 
        userName: this.state.userName, 
        location: this.state.location, 
        datetime: this.state.datetime
    });
  }

  updateTheirValue(evt){
    this.setState({their: evt.target.value});   
  }

  updateUserNameValue(evt){
    this.setState({userName: evt.target.value});   
  }

  loadSearch(){
    return (
        <div className="Searchpage">
          <div id="logo-div" className="column">
          <a id="back" onClick={this.backToHome}><img src={arrowLeft} alt="go-back" /></a>        
            <img id="logo" src={logo} alt="boosala logo"/>
            <div id="panel" className={this.state.language==="arabic" ? "ArTextDirection" : " "}>
                <div className="text">
                  {this.state.text[this.state.language][0]} 
                  <input id="me" placeholder={this.state.text[this.state.language][1]} 
                      onChange={this.updateUserNameValue} required/>
                  {this.state.text[this.state.language][2]}
                </div>
                <div className="text">
                  {this.state.text[this.state.language][3]}
                  <input id="their" placeholder={this.state.text[this.state.language][4]} 
                      onChange={this.updateTheirValue} required/>.
                </div>
            </div>
            <div id="upload">
                <label htmlFor="fileToUpload">
                    <img id="face" src={this.state.face[this.state.language]} alt="boosala logo"/>
                </label>
                <input id="fileToUpload" type="file" name="fileToUpload" />
                <button id="submit" name="submit" onClick={this.loadResult}>{this.state.findButton[this.state.language]}</button>
            </div>
          </div>
        </div>
    );
  }

  render() {
    return (
      <div className="Search">
        {this.state.current === "search" ? this.loadSearch() : null}
        {this.state.current === "home" ? <App language={this.state.language}/> : null}
        {this.state.current === "result" ? 
          <Result language={this.state.language}
          their={this.state.their}
          userName={this.state.userName}
          location={this.state.location}
          datetime={this.state.datetime} /> : null}
      </div>
    );
  }
}

export default Search;
