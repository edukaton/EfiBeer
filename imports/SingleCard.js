import React, { Component } from 'react';
import classnames from 'classnames';

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

export default class SingleCard extends Component {

    constructor(props) {
        super(props);

        this.toggleAnswered = this.toggleAnswered.bind(this);
        this.state = {
            answered: false,
            correct: false,
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(props) {
        if (!props.card) {
            props.incrementStage();
        }
        this.setState({
            answered: false,
            correct: false,
        });
    }

    toggleAnswered(answer) {
        return e => {
            this.setState({
                answered: !this.state.answered,
                correct: this.props.card.answers.split(',')[0].toLowerCase() === answer.toLowerCase(),
            });
        }
    }

    render() {
        const {
            card,
            isLast,
            incrementStage,
        } = this.props;
        return (
            <div className="singleCardComponent">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <div className="singleCard">

                                <div
                                    className={classnames('singleCardflipper', {
                                        // rotate: this.state.answered || card.type === 'info',
                                    })}
                                >
                                {!this.state.answered && card.type.toLowerCase() !== 'info' && (
                                    <div className="singleCardFront">
                                        <div className="singleCardDescription">
                                            <h1 className="singleCardTitle">{card.title}</h1>
                                            <p>
                                                {card.type.toLowerCase() === 'info' ? '' : card.question}
                                            </p>
                                        </div>

                                        {card.type.toLowerCase() === 'truefalse' && (
                                            <div className="singleCardTrueFalse">
                                            <div onClick={this.toggleAnswered('prawda')} className="btn-success">
                                                Prawda <i className="fas fa-thumbs-up"></i>
                                            </div>
                                            <div onClick={this.toggleAnswered('fałsz')} className="btn-danger" >
                                                Fałsz <i className="fas fa-thumbs-down"></i>
                                            </div>
                                        </div>
                                        )}

                                        {card.type.toLowerCase() === 'question' && (
                                            <div className="singleCardABCD">
                                                {shuffleArray(card.answers.split(',').map(answer => (
                                                    <div
                                                        className=""
                                                        onClick={this.toggleAnswered(answer)}
                                                        >
                                                        {answer}
                                                    </div>
                                                )))}
                                            </div>
                                        )}

                                    </div>
                                )}

                                {(this.state.answered || card.type.toLowerCase() === 'info') && (
                                    <div className="singleCardBack">
                                        <h1 className="singleCardTitle">{card.title}</h1>

                                        {card.type.toLowerCase() !== 'info' && (
                                            <h2>{this.state.correct ? 'Dobrze' : 'Źle'}</h2>
                                        )}
                                        <div
                                            dangerouslySetInnerHTML={{__html: card.description}}
                                        />
                                        <br /><br />
                                        <button
                                            onClick={incrementStage}
                                        >
                                            {isLast ? 'Zakończ' : 'Dalej'}
                                        </button>
                                    </div>
                                )}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-2">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
