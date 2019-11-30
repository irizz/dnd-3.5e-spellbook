package com.spellbook.mapper.getSpellsListMapper;

import com.spellbook.dto.common.Spell;
import com.spellbook.dto.getSpellList.GetSpellListResponse;
import com.spellbook.jooq.tables.records.SpellsRecord;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GetSpellsListMapper {

    public GetSpellListResponse map (List<SpellsRecord> spellsRecords) {
        List<Spell> spellList = new ArrayList<>();
        spellsRecords.forEach(spellsRecord -> {
            Spell spell = new Spell();
            spell.setId(spellsRecord.getId());
            spell.setName(spellsRecord.getName());
            spell.setLevel(Integer.valueOf(spellsRecord.getLevel()));
            spellList.add(spell);
        });
        return new GetSpellListResponse(spellList);
    }
}
