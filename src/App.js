import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    // Initialize state
    this.state = {
      questions: [
        { text: "I understand my life’s meaning", answer: 1 },
        { text: "I am looking for something that makes my life feel meaningful", answer: 1 },
        { text: "I am always looking to find my life’s purpose", answer: 1 },
        { text: "My life has a clear sense of purpose", answer: 1 },
        { text: "I have a good sense of what makes my life meaningful", answer: 1 },
        { text: "I have discovered a satisfying life purpose", answer: 1 },
        { text: "I am always searching for something that makes my life feel significant", answer: 1 },
        { text: "I am seeking a purpose or mission for my life", answer: 1 },
        { text: "My life has no clear purpose", answer: 1 },
        { text: "I am searching for meaning in my life", answer: 1 },
      ],
      results: {
        presence: {
          name: "Presence of Meaning in Life",
          text: "How much you feel that your life currently has meaning",
          result: 0,
          max: 35
        },
        search: {
          name: "Search for Meaning in Life",
          text: "How much you are striving to find meaning and understanding your life",
          result: 0,
          max: 35
        }
      },
    };
    
    this.updateAnswer = this.updateAnswer.bind(this);
  }
  
  updateAnswer(event) {
    var newValue = Number.parseInt(event.target.value, 10);
    
    // Extract the question index from the identifier (created in render)
    var answerIndex = event.target.id.slice(6);
    
    var newState = this.state;
    newState.questions[answerIndex].answer = newValue;
    
    // Calculations from http://www.michaelfsteger.com/wp-content/uploads/2012/08/MLQ.pdf
    // Answers array is 0-indexed so "item 1" from the PDF is index 0 in the questions array
    newState.results.presence.result = newState.questions[0].answer + newState.questions[3].answer + newState.questions[4].answer + newState.questions[5].answer + 8 - newState.questions[8].answer;
    newState.results.search.result = newState.questions[1].answer + newState.questions[2].answer + newState.questions[6].answer + newState.questions[7].answer + newState.questions[9].answer;
    
    this.setState(newState);
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>The Meaning in Life Questionnaire</h2>
        </div>
        <p className="App-intro">
          The Meaning in Life Questionnaire (MLQ) estimates your feelings of meaning in life and searching for meaning in life. It was created by <a href="http://www.michaelfsteger.com/" target="_blank">Dr. Steger</a>. The original PDF may be found <a href="http://www.michaelfsteger.com/wp-content/uploads/2012/08/MLQ.pdf" target="_blank">here</a> and the research summary may be found <a href="https://dx.doi.org/10.1037/0022-0167.53.1.80" target="_blank">here</a>.
        </p>
        <hr />
        <h3>Questions</h3>
        <div>
          <p><i>1 = Absolutely Untrue; 2 = Mostly Untrue; 3 = Somewhat Untrue; 4 = Can't Say True or False; 5 = Somewhat True; 6 = Mostly True; 7 = Absolutely True</i></p>
          {
            this.state.questions.map((question, index) =>
              <p key={question.text}>
                <label htmlFor={"answer" + index}>{question.text}</label>
                <input id={"answer" + index} type="range" min="1" max="7" step="1" defaultValue="1" onChange={this.updateAnswer} />
                <span>{question.answer}</span>
              </p>
            )
          }
        </div>
        <div>
          <hr />
          <h3>Results</h3>
          <ul>
            {
              [ "presence", "search" ].map((name) =>
                <li key={name}><span title={this.state.results[name].text}>{this.state.results[name].name}</span>: <b>{this.state.results[name].result}</b> out of {this.state.results[name].max} ({((this.state.results[name].result / this.state.results[name].max) * 100).toFixed(2)}%)</li>
              )
            }
          </ul>
          { this.state.results.presence.result > 0 &&
            <div>
              <p><a href={"mailto:?subject=" + encodeURIComponent("Meaning in Life Questionnaire, " + new Date()) + "&body=" + encodeURIComponent("MLQ Results:\n\n" + (
                [ "presence", "search" ].map((name) =>
                  this.state.results[name].name + ": " + this.state.results[name].result + " out of " + this.state.results[name].max + " (" + (((this.state.results[name].result / this.state.results[name].max) * 100).toFixed(2)) + "%)"
                ).join("\n")
              ) + "\n\nAnswers:\n\n" + this.state.questions.map((question, index) => question.text + ": " + this.state.questions[index].answer ).join("\n"))}>Email these results.</a></p>
            </div>
          }
        </div>
        <hr />
        <p><small>Source code at <a href="https://github.com/kevgrig/mlq-react" target="_blank">https://github.com/kevgrig/mlq-react</a></small></p>
      </div>
    );
  }
}

export default App;
