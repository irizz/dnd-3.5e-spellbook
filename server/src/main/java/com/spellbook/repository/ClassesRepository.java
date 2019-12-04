package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.records.ClassesRecord;
import lombok.RequiredArgsConstructor;
import org.jooq.Field;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.spellbook.jooq.Tables.CLASSES;

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
}
