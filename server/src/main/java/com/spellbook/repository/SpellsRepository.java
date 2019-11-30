package com.spellbook.repository;

import com.spellbook.jooq.tables.records.SpellsRecord;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.spellbook.jooq.Tables.SPELLS;

@Repository
@Transactional
public class SpellsRepository {

    @Autowired
    private DSLContext dslContext;

    public List<SpellsRecord> getAllSpells() {
        return dslContext.select()
                .from(SPELLS)
                .fetch()
                .into(SpellsRecord.class);
    }
}
