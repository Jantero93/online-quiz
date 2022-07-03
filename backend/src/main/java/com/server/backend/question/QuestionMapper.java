package com.server.backend.question;

import java.util.ArrayList;
import java.util.HashSet;

public final class QuestionMapper {

    public static QuestionDto QuestionToDto(Question question) {
        QuestionDto q = new QuestionDto();

        q.question = question.getQuestion();
        q.correctOption = question.getCorrectOption();
        q.wrongOptions = question.getWrongOptions();
        q.difficulty = question.getDifficulty();

        return q;
    }

    public static Question QuestionDtoToQuestion(QuestionDto questionDto) {
        Question q = new Question();

        q.setQuestion(questionDto.question);
        q.setCorrectOption(questionDto.getCorrectOption());
        q.setWrongOptions(questionDto.wrongOptions);
        q.setDifficulty(questionDto.difficulty);

        return q;
    }

}
