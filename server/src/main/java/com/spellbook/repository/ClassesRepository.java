package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.records.ClassesRecord;
import lombok.RequiredArgsConstructor;
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.spellbook.jooq.Tables.CLASSES;
import static com.spellbook.jooq.Tables.CLASS_SPELL_AVAILABILITY;
import static com.spellbook.jooq.Tables.SPELLS;

@Repository
@Transactional
@RequiredArgsConstructor
public class ClassesRepository extends DefaultRepository {

    @Override
    protected Table<ClassesRecord> getDaoTable() {
        return CLASSES;
    }

    @Override
    protected Field<UUID> getIdField() {
        return CLASSES.ID;
    }

    @Override
    protected Class<Classes> getPogoClass() {
        return Classes.class;
    }

    public List<Record> getClassesBySpellId(UUID id) {
        return dslContext.select()
                .from(CLASSES)
                .join(CLASS_SPELL_AVAILABILITY).on(CLASSES.ID.eq(CLASS_SPELL_AVAILABILITY.CLASS_ID))
                .join(SPELLS).on(SPELLS.ID.eq(CLASS_SPELL_AVAILABILITY.SPELL_ID))
                .where(SPELLS.ID.eq(id))
                .fetch();
    }
}
