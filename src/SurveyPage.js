import React from 'react'
import CheckboxGroup from 'react-checkbox-group'
import {
    Grid,
    Button,
    Typography
} from "@material-ui/core";

import json from "../src/db.json"
import QuestionBox from './QuestionBox.js';
import { QuestionGroup } from './QuestionGroup.js';

class SurveyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionOrder: 0,
            firstQuestionAnswers: [],
            otherAnswer: '',
            wantedQuestions: [],
            showTechRelatedQuestions: false,
            techQuestionsFinished: false,
            techQuestionsResult: [],
            comment: '',
            isSurveyFinished: false,
            isSubmitted: false,

        };
    }

    submitSurvey = () => {
        if (this.state.otherAnswer && !this.state.comment) {
            alert('please enter a comment');
        } else {
            this.setState({ isSurveyFinished: true, isSubmitted: true });
        }
    }

    renderResults = () => {
        return <>
            <h2>{this.state.otherAnswer}</h2>
            <h3>{this.state.comment}</h3>
            {this.state.wantedQuestions.map((questionObj, i) => (
                <>
                    <h2>{questionObj.name}</h2>
                    {questionObj.questions.map((question, j) => (
                        <>
                            <h3>{question.question}</h3>
                            <ul>
                                <li>{this.state.techQuestionsResult[i][j]}</li>
                            </ul>

                        </>
                    ))}
                </>
            ))}
        </>

    }

    showQuestions = () => {
        return (
            <> <h2>Tech Survey</h2>
                <Grid item>
                    {!this.state.showTechRelatedQuestions && this.firstQuestion()}
                    {this.state.showTechRelatedQuestions && !this.state.techQuestionsFinished && this.state.wantedQuestions.length !== 0 && this.techRelatedQuestions()}
                    {this.state.techQuestionsFinished && !this.state.isSubmitted && <><input onChange={(e) => this.setState({ comment: e.target.value })} /> <button onClick={this.submitSurvey}>Submit</button> </>}
                    {this.state.isSurveyFinished && this.renderResults()}
                </Grid>

            </>
        )

    }

    increaseQuestionCount = (answerResults) => {
        this.setState(state => ({ techQuestionsResult: [...state.techQuestionsResult, answerResults] }));
        if (this.state.questionOrder + 1 !== this.state.wantedQuestions.length) {
            this.setState(state => ({ questionOrder: state.questionOrder + 1 }));
        } else {
            this.setState({ techQuestionsFinished: true });
        }
    }
    techRelatedQuestions = () => {
        return (<QuestionGroup questionObj={this.state.wantedQuestions[this.state.questionOrder]} changeQuestionOrder={this.increaseQuestionCount}></QuestionGroup>)
    }
    firstQuestion = () => {
        return (
            <>
                <><Grid container direction="column" justify="center" alignItems="center">
                    <Typography>Hangi teknolojilerle ilgineleniyorsun ?</Typography>
                </Grid>
                    <CheckboxGroup name="techs" value={this.state.firstQuestionAnswers} onChange={(firstQuestionAnswers) => this.setState({ firstQuestionAnswers })}>
                        {(Checkbox) => (
                            <>
                                <label>
                                    <Checkbox value="React" /> React
                            </label>
                                <label>
                                    <Checkbox value="Vue" /> Vue
                            </label>
                                <label>
                                    <Checkbox value="Angular" /> Angular
                            </label>
                                <label>
                                    <Checkbox value="Other" /> Other
                            </label>
                                {this.state.firstQuestionAnswers.includes('Other') && <input onChange={(e) => this.setState({ otherAnswer: e.target.value })} />}
                            </>
                        )}
                    </CheckboxGroup> </>

                <Button onClick={() => {
                    const wantedQuestions = json.filter(questions => this.state.firstQuestionAnswers.includes(questions.name));

                    if (wantedQuestions.length === 0) {
                        this.setState({ techQuestionsFinished: true, showTechRelatedQuestions: true });
                    } else {
                        this.setState({ wantedQuestions, showTechRelatedQuestions: true });
                    }

                }} >NEXT 👉</Button>
            </>
        )

    }

    render() {
        return (
            <Grid container direction="row" justify="center">
                <Grid item style={{ margin: 150 }}>
                    {this.showQuestions()}
                </Grid>
            </Grid>
        )
    }

}

export default SurveyPage;
