package com.server.backend.question;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@Transactional
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public QuestionDto createQuestion(QuestionDto questionDto) {
        log.info("Saving new question to database {}", questionDto);
        Question question = QuestionMapper.QuestionDtoToQuestion(questionDto);

        Question dbQuestion = questionRepository.save(question);
        return QuestionMapper.QuestionToDto(dbQuestion);
    }
}
