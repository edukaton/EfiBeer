import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const stateToPick = {
  info: [
    'title',
    'description'
  ],
  question: [
    'question',
    'answers',
  ],
  truefalse: [
    'question',
    'isTrue',
  ],
  image: [
    'image_path',
    'image_points',
  ],
};

export default class CardForm extends Component {
  constructor(props) {
    super(props);

    this.changeTextState = this.changeTextState.bind(this);
    this.changeType = this.changeType.bind(this);
    this.onIsCorrectChange = this.onIsCorrectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      type: 'info',
      question: '',
      image_path: '',
      image_points: [],
      answers: '',
      isCorrect: false,
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const card = props.card || {};
    this.setState({
      title: card.title || '',
      description: card.description || '',
      type: card.type || 'info',
      question: card.question || '',
      image_path: card.image_path || '',
      image_points: card.image_points || [],
      answers: card.answers || '',
      isCorrect: card.isCorrect || false,
    });
  }

  changeType({ value }) {
    this.setState({
      type: value,
    });
  }

  changeTextState(key) {
    return val => {
      const value = val.target ? val.target.value : val;
      this.setState({
        [key]: value,
      });
    }
  }

  onIsCorrectChange({ target }) {
    this.setState({
      isCorrect: target.checked,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {


    return (
      <form onSubmit={this.onSubmit} style={{'background': '#36D1DC',
    'background': '-webkit-linear-gradient(to right, #5B86E5, #36D1DC)',
    'background': 'linear-gradient(to right, #5B86E5, #36D1DC)', 'height': '100%', 'height': '100vh'}} >
      <div className = "container" style={{'max-width': 600, 'background': 'white', 'height': '100%', 'height': '100vh'}}>
        <h3 className = "text-center">
          Stwórz własną fraszkę!
        </h3>
        <p className = "">
          Wybierz rodzaj fraszki:
        </p>
        <Select
          value={this.state.type}
          onChange={this.changeType}
          options={[
            { value: 'info', label: 'Info' },
            { value: 'question', label: 'Pytanie' },
            { value: 'truefalse', label: 'Prawda/Fałsz' },
            { value: 'image', label: 'Obraz' },
          ]}
        />
        <br />
        <p>
          Nazwa fraszki:
        </p>
        <input
          type="text"
          value={this.state.title}
          onChange={this.changeTextState('title')}
          placeholder="Wisz tytuł fraszki"
          className = "form-control"
        />
        <br />
        <p>
          Opis danego zagadnienia:
        </p>
        <textarea
          placeholder="Wpisz opis"
          onChange={this.changeTextState('description')}
          value={this.state.description}
          className = "form-control"
          rows="8"
        />
        <br />
        {this.state.type !== 'info' && (
        <div>
        <p>
          Pytanie zadane użytnikowi:
        </p>
          <input
            type="text"
            value={this.state.question}
            onChange={this.changeTextState('question')}
            placeholder="Wpisz pytanie"
            className = "form-control"
          />
          </div>
        )}
        <br />
        {this.state.type === 'image' && (
          <div>
          <p>
            Podaj adres obrazka:
          </p>
          <input
            type="text"
            value={this.state.image_path}
            onChange={this.changeTextState('image_path')}
            placeholder="adres obrazka"
            className = "form-control"
          />
          </div>
        )}
        {this.state.type === 'truefalse' && [
          <input
            type="checkbox"
            checked={this.state.isTrue}
            onChange={this.onIsCorrectChange}
          />,
          'Poprawne'
        ]}
        {this.state.type === 'question' && (
          <div>
            <p>Odpowiedzi</p>
            <textarea
              placeholder="Odpowiedzi należy rozdzielić przecinkiem. Przykład poniżej."
              onChange={this.changeTextState('answers')}
              value={this.state.answers}
              className = "form-control"
            />
            <p>
              Schemat: Prawidłowa odpowiedź,zła odpowiedź,zła odpowiedź,zła odpowiedź
            </p>
          </div>
        )}
        <div>
        <br />
        <button className="btn btn-success float-right">Wyślij</button>
        <Link to={this.props.backUrl}>
          <button type="button" className="btn btn-info">Cofnij</button>
        </Link>
        </div>
      </div>
      </form>
    );
  }
}