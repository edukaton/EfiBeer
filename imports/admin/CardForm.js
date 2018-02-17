import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

    const card = props.card || {};

    this.state = {
      title: card.title || '',
      description: card.description || '',
      type: card.info || 'info',
      question: card.question || '',
      image_path: card.image_path || '',
      image_points: card.image_points || [],
      answers: card.answers || '',
      isCorrect: false,
    };
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

  render() {
    return (
      <div>
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
        <input 
          type="text"
          value={this.state.title}
          onChange={this.changeTextState('title')}
          placeholder="tytuł"
        />
        <br />
        <textarea
          placeholder="opis"
          onChange={this.changeTextState('description')}
          value={this.state.description}
        />
        <br />
        {this.state.type !== 'info' && (
          <input 
            type="text"
            value={this.state.question}
            onChange={this.changeTextState('question')}
            placeholder="pytanie"
          />
        )}
        <br />
        {this.state.type === 'image' && (
          <input 
            type="text"
            value={this.state.image_path}
            onChange={this.changeTextState('image_path')}
            placeholder="adres obrazka"
          />
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
            <h3>Odpowiedzi</h3>
            <p>Oddzielaj przecinkiem</p>
            <p>Pierwsza jest poprawna</p>
            <p>Będa się losować</p>
            <textarea
              placeholder="odpowiedzi"
              onChange={this.changeTextState('answers')}
              value={this.state.answers}
            />
          </div>
        )}
      </div>
    );
  }
}