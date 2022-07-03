package com.server.backend.question;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;
import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class QuestionDto {
    @NotBlank
    @NotNull
    public String question;

    @NotBlank
    @NotNull
    public String correctOption;

    @NotEmpty
    @NotNull
    @UniqueElements
    @Size(min = 1)
    @Size(max = 3)
    public List<String> wrongOptions;

    @NotBlank
    @NotNull
    public String difficulty;
}
