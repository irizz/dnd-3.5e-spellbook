package com.spellbook.mapper;

import com.spellbook.dto.GetClassesListResponse;
import com.spellbook.dto.GetSpellsListResponse;
import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.pojos.Spells;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class Mapper {

    private final GetSpellsListMapper getSpellsListMapper;
    private final GetClassesListMapper getClassesListMapper;

    public GetSpellsListResponse mapSpellsList(List<Spells> spellsList) {
        return Optional.ofNullable(spellsList)
                .map(getSpellsListMapper::map)
                .orElse(new GetSpellsListResponse(Collections.emptyList()));
    }

    public GetClassesListResponse mapClassesList(List<Classes> classList) {
        return Optional.ofNullable(classList)
                .map(getClassesListMapper::map)
                .orElse(new GetClassesListResponse(Collections.emptyList()));
    }
}
