import React, { Component } from 'react';
import './App.css';
import logo_front from  './images/logo_front.png';
import logo_back from './images/logo_back.png';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      language: 'english',
      heading:{
        english: 'بوصلة',
        arabic: ''
      },
      title: {
        english: 'Boosala',
        arabic: 'بوصلة'
      },
      caption: {
        english: 'Bring home the lost',
        arabic: '',
      },
      startButton: {
        english: 'Start',
        arabic: 'ابدأ'
      }
    }
  }

  renderLanguageBar() {
    return(
      <div id="languages">
          <ul>
            <li id="arabic">عربي</li>
            <li id="english">English</li>
          </ul>
      </div>
    );

  };

  render() {
    return (
      <div className="App">
        {this.renderLanguageBar()}
        <div className="Homepage">
          <div id="logo-div">
              <img id="logo-back" class="logo" src={logo_front} alt="boosala logo"/>
              <img id="logo-front" class="logo" src={logo_back} alt="boosala logo"/>
          </div>
          <div id="heading">{this.state.heading[this.state.language]}</div>
          <div id="title">{this.state.title[this.state.language]}</div>
          <div id="caption">{this.state.caption[this.state.language]}</div>
          <button id="startButton">{this.state.startButton[this.state.language]}</button>
        </div>
      </div>
    );
  }
}

export default App;
