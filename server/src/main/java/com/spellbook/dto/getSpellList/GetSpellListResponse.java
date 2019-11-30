package com.spellbook.dto.getSpellList;

import com.spellbook.dto.common.Spell;

import java.util.List;

public class GetSpellListResponse {

    private List<Spell> spellList;

    public GetSpellListResponse(List<Spell> spellList) {
        this.spellList = spellList;
    }

    public List<Spell> getSpellList() {
        return spellList;
    }
}
