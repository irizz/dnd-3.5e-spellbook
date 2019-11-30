package com.spellbook.service;

import com.spellbook.dto.getSpellList.GetSpellListResponse;
import com.spellbook.mapper.Mapper;
import com.spellbook.repository.SpellsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpellbookService {

    @Autowired
    private SpellsRepository spellsRepository;

    @Autowired
    private Mapper mapper;

    public GetSpellListResponse getSpellList() {
        return mapper.mapSpellList(spellsRepository.getAllSpells());
    }
}
