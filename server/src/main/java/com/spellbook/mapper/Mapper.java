package com.spellbook.mapper;

import com.spellbook.dto.getSpellList.GetSpellListResponse;
import com.spellbook.jooq.tables.records.SpellsRecord;
import com.spellbook.mapper.getSpellsListMapper.GetSpellsListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
public class Mapper {

    @Autowired
    private GetSpellsListMapper getSpellsListMapper;

    public GetSpellListResponse mapSpellList(List<SpellsRecord> spellsRecords) {
        return Objects.isNull(spellsRecords)
                ? new GetSpellListResponse(Collections.emptyList())
                : getSpellsListMapper.map(spellsRecords);
    }



}
