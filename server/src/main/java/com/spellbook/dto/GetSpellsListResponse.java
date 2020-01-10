package com.spellbook.dto;

import com.spellbook.dto.common.Spell;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetSpellsListResponse {

    private List<Spell> spellsList;
}
