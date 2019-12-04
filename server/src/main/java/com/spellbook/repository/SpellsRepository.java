package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.Spells;
import com.spellbook.jooq.tables.records.SpellsRecord;
import lombok.RequiredArgsConstructor;
import org.jooq.Field;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.spellbook.jooq.Tables.CLASS_SPELL_AVAILABILITY;
import static com.spellbook.jooq.Tables.SPELLS;

@Repository
@Transactional
@RequiredArgsConstructor
public class SpellsRepository extends DefaultRepository {

    @Override
    protected Table<SpellsRecord> getDaoTable() {
        return SPELLS;
    }

    @Override
    protected Field<UUID> getIdField() {
        return SPELLS.ID;
    }

    @Override
    protected Class<Spells> getPogoClass() {
        return Spells.class;
    }

    public List<Spells> findSpellsListByClass(UUID classId) {
        return dslContext.select(getDaoTable().asterisk())
                .from(getDaoTable())
                .join(CLASS_SPELL_AVAILABILITY).on(SPELLS.ID.eq(CLASS_SPELL_AVAILABILITY.SPELL_ID))
                .where(CLASS_SPELL_AVAILABILITY.CLASS_ID.eq(classId))
                .fetch()
                .into(getPogoClass());
    }
}
