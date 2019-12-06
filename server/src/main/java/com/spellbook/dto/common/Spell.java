package com.spellbook.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Accessors(fluent = true)
public class Spell {

    @JsonProperty
    private UUID id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String school;

    @JsonProperty
    private String components;

    @JsonProperty
    private String castingTime;

    @JsonProperty
    private String range;

    @JsonProperty
    private String area;

    @JsonProperty
    private String target;

    @JsonProperty
    private String effect;

    @JsonProperty
    private String duration;

    @JsonProperty
    private String savingThrow;

    @JsonProperty
    private String spellResistance;

    @JsonProperty
    private String materialComponents;

    @JsonProperty
    private String description;

    @JsonProperty
    private List<Class> classes;
}
