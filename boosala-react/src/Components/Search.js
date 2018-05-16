import React, { Component } from 'react';
import './../css/Search.css';
import logo from './../images/logo.png';

class Search extends Component {

  constructor(props){
    super(props);
    //Break up each text into english and arabic
    this.state = {
      language: 'english',
      text:{
        english: ['My name is', 'Your name', 'and', 'I\'m looking for', 'Their name'],
        arabic: ['اسمي', 'الاسم', '', 'وأبحث عن', 'اسم المفقود']
      },
      findButton: {
        english: 'Find',
        arabic: 'ابحث'
      }
    }
  }



  render() {
    return (
        <div className="Searchpage">
          <div id="logo-div" className="column">
            <img id="logo" src={logo} alt="boosala logo"/>
            <div id="panel">
            <div className="text">
              {this.state.text[this.state.language][0]} 
              <input id="me" name="me" placeholder={this.state.text[this.state.language][1]}  required/>
              {this.state.text[this.state.language][2]}
            </div>
            <div className="text">
              {this.state.text[this.state.language][3]}
              <input id="their" name="him" placeholder={this.state.text[this.state.language][4]} required />.
            </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Search;
