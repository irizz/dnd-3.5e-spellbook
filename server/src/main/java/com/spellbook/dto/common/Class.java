package com.spellbook.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@NoArgsConstructor
@Accessors(fluent = true)
public class Class {

    @JsonProperty
    private UUID id;

    @JsonProperty
    private String name;

    @JsonProperty
    private Integer level;
}
