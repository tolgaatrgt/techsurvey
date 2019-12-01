import React from "react"
import { Typography, Button } from "@material-ui/core";
import CheckboxGroup from 'react-checkbox-group'


class QuestionBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: []
        };
    }
    setOnlyOneAnswer = (answerArray) => {
        this.setState({ answer: [answerArray.pop()] });
    }

    render() {
        const { question, answers, nextQuestion } = this.props;
        return (
            <>
                <Typography>{question}</Typography>
                <CheckboxGroup name="techs" value={this.state.answer} onChange={this.setOnlyOneAnswer}>
                    {(Checkbox) => (
                        <>
                            {answers.map((answer) => (<label><Checkbox value={answer} />{answer}</label>))}
                        </>
                    )}
                </CheckboxGroup>

                {this.state.answer.length > 0 && <Button onClick={() => {
                    nextQuestion(this.state.answer[0])
                    this.setState({ answer: [] })
                }} >NEXT 👉</Button>}
            </>

        )
    }
}

export default QuestionBox;