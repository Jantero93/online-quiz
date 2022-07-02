package com.server.backend.question;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue
    private Integer id;

    private String question;

    private String correctOption;

    @ElementCollection
    private Set<String> wrongOptions;

    private String difficulty;

}
