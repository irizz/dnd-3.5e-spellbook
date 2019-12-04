package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.ClassSpellAvailability;
import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.records.ClassSpellAvailabilityRecord;
import lombok.RequiredArgsConstructor;
import org.jooq.Field;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.spellbook.jooq.Tables.CLASSES;
import static com.spellbook.jooq.Tables.CLASS_SPELL_AVAILABILITY;

@Repository
@Transactional
@RequiredArgsConstructor
public class SpellClassAvailabilityRepository extends DefaultRepository {

    @Override
    protected Table<ClassSpellAvailabilityRecord> getDaoTable() {
        return CLASS_SPELL_AVAILABILITY;
    }

    @Override
    protected Field<UUID> getIdField() {
        return CLASS_SPELL_AVAILABILITY.ID;
    }

    @Override
    protected Class<ClassSpellAvailability> getPogoClass() {
        return ClassSpellAvailability.class;
    }

    public List<Classes> getClassesBySpellId(UUID id) {
        List<UUID> classesIdList =  dslContext.selectFrom(getDaoTable())
                .where(CLASS_SPELL_AVAILABILITY.SPELL_ID.eq(id))
                .fetch(CLASS_SPELL_AVAILABILITY.CLASS_ID);
        return dslContext.selectFrom(CLASSES)
                .where(CLASSES.ID.in(classesIdList))
                .fetch()
                .into(Classes.class);
    }
}
