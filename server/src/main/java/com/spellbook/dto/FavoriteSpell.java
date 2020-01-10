package com.spellbook.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class FavoriteSpell {

    @JsonProperty
    private UUID id;

    @JsonProperty
    private UUID classId;
}
