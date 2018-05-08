import React, { PureComponent } from 'react';
import { Collapsible } from '../Block/Collapsible';
import { RenderContent } from '../Content/RenderContent';
import { Header } from '../Block/Header';

class QuestionAnswer extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderTitle() {
    const { question } = this.props;
    return (
      <Header className="question" h5>{question}</Header>
    );
  }

  renderCollapsed() {
    const { answer } = this.props;
    return (
      <RenderContent content={answer} className="answer" useReactRouter />
    );
  }

  render() {
    return (
      <Collapsible
        li
        className="question-answer"
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
      />
    );
  }
}

export const mapQuestionAnswer = (props, index) => {
  return (
    <QuestionAnswer {...props} key={index.toString()} />
  );
};
