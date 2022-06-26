import React, { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';

import { postQuestion } from '../services/questionService';

import { Difficulty, Question } from '../types/question';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const clearInput = () => {
    setQuestion('');
    setCorrect('');
    setOption2('');
    setOption3('');
    setOption4('');
    setDifficulty('easy');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validInput()) return;

    const newQuestion: Partial<Question> = {
      correctOption: correct,
      difficulty,
      question,
      wrongOptions: [option2, option3, option4]
    };

    try {
      await postQuestion(newQuestion);
      clearInput();
    } catch (error) {
      console.error(error);
    }
  };

  const validInput = () => {
    const optionArray = [correct, option2, option3, option4];
    const set = new Set(optionArray);

    if (set.size !== 4) return false;
    if (!question) return false;
    if (question.length > 1023) return false;
    if (optionArray.some((option) => option === '')) return false;

    return true;
  };

  return (
    <Form
      className="_Max_Width_500 mx-auto _ColorDepth-Bg-4 mt-5 p-3 rounded"
      onSubmit={submit}
    >
      <Form.Group className="mb-3" controlId="formQuestion">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Correct</Form.Label>
        <Form.Control onChange={(e) => setCorrect(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Option 2</Form.Label>
        <Form.Control onChange={(e) => setOption2(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Option 3</Form.Label>
        <Form.Control onChange={(e) => setOption3(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Option 4</Form.Label>
        <Form.Control onChange={(e) => setOption4(e.target.value)} />
      </Form.Group>

      <FormLabel>Difficulty</FormLabel>
      <div key="inline-radio" className="mb-3">
        <Form.Check
          inline
          label="Easy"
          name="group1"
          type={'radio'}
          onChange={() => setDifficulty('easy')}
        />
        <Form.Check
          inline
          label="Medium"
          name="group1"
          type="radio"
          onChange={() => setDifficulty('medium')}
        />
        <Form.Check
          inline
          label="Hard"
          name="group1"
          type="radio"
          onChange={() => setDifficulty('hard')}
        />
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddQuestion;
