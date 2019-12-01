import React from 'react';

import QuestionBox from './QuestionBox';




export class QuestionGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionCount: 0,
            answerResults: []
        }
    }

    nextQuestion = (currentAnswer) => {
        if (this.state.questionCount + 1 !== this.props.questionObj.questions.length) {
            this.setState(state => ({ answerResults: [...state.answerResults, currentAnswer] }));
            this.setState(state => ({ questionCount: state.questionCount + 1 }));
        } else {
            this.setState({ questionCount: 0 });
            this.props.changeQuestionOrder([...this.state.answerResults, currentAnswer]);
        }

    }

    render() {
        const { questionObj: { name, questions } } = this.props;
        const currentQuestion = questions[this.state.questionCount];

        return (
            <>
                <h2>{name}</h2>
                {<QuestionBox question={currentQuestion.question} answers={currentQuestion.answers} nextQuestion={this.nextQuestion} />}
            </>
        );
    }
}