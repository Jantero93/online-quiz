import React, { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';

import { postQuestion, PostQuestion } from '../services/questionService';
import { Difficulty } from '../types/question';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const [errors, setErrors] = useState<string[]>([]);

  const clearInput = () => {
    setQuestion('');
    setCorrect('');
    setOption2('');
    setOption3('');
    setOption4('');
    setDifficulty('easy');
  };

  const submitQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidInput()) {
      return;
    }

    const newQuestion: PostQuestion = {
      correct_option: correct.trim(),
      difficulty: difficulty.trim(),
      question: question.trim(),
      wrong_options: [option2.trim(), option3.trim(), option4.trim()]
    };

    try {
      await postQuestion(newQuestion);
      clearInput();
    } catch (error) {
      console.error(error);
    }
  };

  const isValidInput = () => {
    setErrors([]);

    const optionArray = [correct, option2, option3, option4];
    const set = new Set(optionArray);

    let isValidInput = true;

    const addErrorIfNoExists = (
      newMsg: 'Must be 4 unique options' | 'Max length 1024 characters'
    ) => {
      const newErrorMsg = errors.indexOf(newMsg) === -1;
      newErrorMsg && setErrors((errors) => [...errors, newMsg]);
    };

    const notUniqueOptions = set.size !== 4;
    const isQuestionEmpty = !question.trim();
    const isSomeOptionEmpty = optionArray.some((o) => !o.trim());

    if (notUniqueOptions || isQuestionEmpty || isSomeOptionEmpty) {
      addErrorIfNoExists('Must be 4 unique options');
      isValidInput = false;
    }

    if (question.length > 1023) {
      addErrorIfNoExists('Max length 1024 characters');
      isValidInput = false;
    }

    return isValidInput;
  };

  return (
    <Form
      className="_Max_Width_500 mx-auto _ColorDepth-Bg-4 mt-5 p-3 rounded"
      onSubmit={submitQuestion}
    >
      <Form.Group className="mb-3" controlId="formQuestion">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Correct</Form.Label>
        <Form.Control
          value={correct}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCorrect(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Option 2</Form.Label>
        <Form.Control
          value={option2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOption2(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Option 3</Form.Label>
        <Form.Control
          value={option3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOption3(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Option 4</Form.Label>
        <Form.Control
          value={option4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOption4(e.target.value)
          }
        />
      </Form.Group>
      <FormLabel>Difficulty</FormLabel>
      <div key="inline-radio" className="mb-3">
        <Form.Check
          inline
          defaultChecked
          label="Easy"
          name="group1"
          type="radio"
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
      {errors.length > 0 && (
        <ul>
          {errors.map((errorMsg) => (
            <li key={errorMsg} style={{ color: 'red' }}>
              {errorMsg}
            </li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default AddQuestion;
