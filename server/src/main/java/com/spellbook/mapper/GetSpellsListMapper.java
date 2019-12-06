package com.spellbook.mapper;

import com.spellbook.dto.common.Class;
import com.spellbook.dto.common.Spell;
import com.spellbook.dto.getSpellList.GetSpellsListResponse;
import com.spellbook.jooq.tables.pojos.Spells;
import com.spellbook.repository.ClassesRepository;
import lombok.AllArgsConstructor;
import org.jooq.Record;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.spellbook.jooq.tables.ClassSpellAvailability.CLASS_SPELL_AVAILABILITY;
import static com.spellbook.jooq.tables.Classes.CLASSES;

@Component
@AllArgsConstructor
class GetSpellsListMapper {

    private final ClassesRepository classesRepository;

    GetSpellsListResponse map(List<Spells> spellsList) {
        List<Spell> spellList = new ArrayList<>();
        spellsList.forEach(spell ->
                spellList.add(new Spell()
                        .id(spell.getId())
                        .name(spell.getName())
                        .school(spell.getSchool())
                        .components(spell.getComponents())
                        .castingTime(spell.getCastingTime())
                        .range(spell.getRange())
                        .area(spell.getArea())
                        .target(spell.getTarget())
                        .effect(spell.getEffect())
                        .duration(spell.getDuration())
                        .savingThrow(spell.getSavingThrow())
                        .spellResistance(spell.getSpellResistance())
                        .materialComponents(spell.getMaterialComponents())
                        .description(spell.getDescription())
                        .classes(mapClasses(spell.getId()))));
        return new GetSpellsListResponse(spellList);
    }

    private List<Class> mapClasses(UUID id) {
        List<Record> classesRecords = classesRepository.getClassesBySpellId(id);
        return classesRecords.stream()
                .map(x -> new Class()
                        .id(x.get(CLASSES.ID))
                        .name(x.get(CLASSES.NAME))
                        .level(x.get(CLASS_SPELL_AVAILABILITY.LEVEL)))
                .collect(Collectors.toList());
    }
}
