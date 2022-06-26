package com.server.backend.question;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    QuestionRepository questionRepository;

    public QuestionDto createQuestion(QuestionDto questionDto) {
        LOGGER.info("Saving new question to database");
        Question question = QuestionMapper.QuestionDtoToQuestion(questionDto);

        Question dbQuestion = questionRepository.save(question);
        return QuestionMapper.QuestionToDto(dbQuestion);
    }
}
