package com.spellbook.service;

import com.spellbook.dto.getSpellList.GetClassesListResponse;
import com.spellbook.dto.getSpellList.GetSpellsListResponse;
import com.spellbook.mapper.Mapper;
import com.spellbook.repository.ClassesRepository;
import com.spellbook.repository.SpellsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
//TODO find out why there is warning and delete annotation
@SuppressWarnings("unchecked")
public class SpellbookService {

    private final SpellsRepository spellsRepository;
    private final ClassesRepository classesRepository;
    private final Mapper mapper;

    public GetSpellsListResponse getSpellsList() {
        return mapper.mapSpellsList(spellsRepository.findAll());
    }

    public GetSpellsListResponse getSpellsListByClass(UUID classId) {
        return mapper.mapSpellsList(spellsRepository.findSpellsListByClass(classId));
    }

    public GetClassesListResponse getClassesList() {
        return mapper.mapClassesList(classesRepository.findAll());
    }
}
