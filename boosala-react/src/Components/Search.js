import React, { Component } from 'react';
import './../css/Search.css';
import logo from './../images/logo.png';
import faceEn from './../images/faceEn.jpeg';
import faceAr from './../images/faceAr.jpg';
import arrowLeft from './../images/arrowLeft.png';
//import $ from 'jquery'
import App from './App';


class Search extends Component {

  constructor(props){
    super(props);
    this.backToHome = this.backToHome.bind(this);
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
      current: "search",
      backgroundColor: "white"
    }
  }

  backToHome(){
    this.setState({current: "home"});
  }

  loadSearch(){
    return (
        <div className="Searchpage">
          <a id="back" onClick={this.backToHome}><img src={arrowLeft} alt="go-back" /></a>        
          <div id="logo-div" className="column">
            <img id="logo" src={logo} alt="boosala logo"/>
            <div id="panel" className={this.state.language==="arabic" ? "ArTextDirection" : " "}>
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
            <div id="upload">
                <label for="fileToUpload">
                    <img id="face" src={this.state.face[this.state.language]} alt="boosala logo"/>
                </label>
                <input id="fileToUpload" type="file" name="fileToUpload" onchange="readURL(this);" />
                <button id="submit" name="submit">{this.state.findButton[this.state.language]}</button>
            </div>
          </div>
        </div>
    );
  }

  render() {
    return (
      <div className="Search">
        {this.state.current === "search" ? this.loadSearch() : null}
        {this.state.current === "home" ? <App/> : null}
      </div>
    );
  }
}

export default Search;
