package com.spellbook.mapper;

import com.spellbook.dto.getSpellList.GetClassesListResponse;
import com.spellbook.dto.getSpellList.GetSpellsListResponse;
import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.pojos.Spells;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
public class Mapper {

    private final GetSpellsListMapper getSpellsListMapper;
    private final GetClassesListMapper getClassesListMapper;

    public GetSpellsListResponse mapSpellsList(List<Spells> spellsList) {
        return Objects.isNull(spellsList)
                ? new GetSpellsListResponse(Collections.emptyList())
                : getSpellsListMapper.map(spellsList);
    }

    public GetClassesListResponse mapClassesList(List<Classes> classList) {
        return Objects.isNull(classList)
                ? new GetClassesListResponse(Collections.emptyList())
                : getClassesListMapper.map(classList);
    }
}
