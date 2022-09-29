import React, { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Toast from 'react-bootstrap/esm/Toast';
import ToastContainer from 'react-bootstrap/esm/ToastContainer';

import { postQuestion, PostQuestion } from '../services/questionService';
import { Difficulty } from '../types/question';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastHeader, setToastHeader] = useState<'Info' | 'Error'>('Info');

  const clearInput = () => {
    setQuestion('');
    setCorrect('');
    setOption2('');
    setOption3('');
    setOption4('');
    setDifficulty('easy');
  };

  const setToastContentAndShow = (header: 'Info' | 'Error', msg: string) => {
    setToastHeader(header);
    setToastText(msg);
    setShowToast(true);
  };

  const submitQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validInput()) return;

    const newQuestion: PostQuestion = {
      correct_option: correct,
      difficulty,
      question,
      wrong_options: [option2, option3, option4]
    };

    try {
      await postQuestion(newQuestion);
      clearInput();
      setToastContentAndShow('Info', 'Question uploaded');
    } catch (error) {
      console.error(error);
      setToastContentAndShow('Error', 'Question upload failed');
    }
  };

  const validInput = () => {
    const optionArray = [correct, option2, option3, option4];
    const set = new Set(optionArray);

    if (set.size !== 4) return false;
    if (!question) return false;
    if (question.length > 1023) return false;
    if (optionArray.some((option) => option.trim() === '')) return false;

    return true;
  };

  return (
    <>
      <Form
        className="_Max_Width_500 mx-auto _ColorDepth-Bg-4 mt-5 p-3 rounded"
        onSubmit={submitQuestion}
      >
        <Form.Group className="mb-3" controlId="formQuestion">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Correct</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCorrect(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Option 2</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOption2(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Option 3</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOption3(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Option 4</Form.Label>
          <Form.Control
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
      <ToastContainer position="bottom-center">
        <Toast
          delay={2000}
          autohide
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastHeader === 'Error' ? 'danger' : 'success'}
        >
          <Toast.Header>
            <strong className="me-auto">{toastHeader}</strong>
          </Toast.Header>
          <Toast.Body>
            <strong>{toastText}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddQuestion;
