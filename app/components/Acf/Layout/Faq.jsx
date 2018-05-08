import React from 'react';
import PropTypes from 'prop-types';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { mapQuestionAnswer } from '../../Faq';
import { splitArray } from '../../../utils/starward';

const QuestionWrapper = props => {
  const { questions } = props;
  return (
    <ul className="q-n-a-container">
      {questions.map(mapQuestionAnswer)}
    </ul>
  );
};

QuestionWrapper.propTypes = {
  questions: PropTypes.array,
};

export const Faq = props => {
  const { header, questions, backgroundColor } = props;
  const { even: evenQuestions, odd: oddQuestions } = splitArray(questions || []);

  return (
    <ColorSection
      name="FAQ"
      backgroundColor={backgroundColor || 'white'}
      innerClassName="wrapper-content med-padded"
    >
      {header && <Header h3>{header}</Header>}
      <div className="q-n-a-wrapper">
        <QuestionWrapper questions={evenQuestions} />
        <QuestionWrapper questions={oddQuestions} />
      </div>
    </ColorSection>
  );
};
