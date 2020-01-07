package com.spellbook.repository;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Table;
import org.jooq.UpdatableRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.UUID;

@Component
public abstract class DefaultRepository<C, R extends UpdatableRecord<R>> {

    @Autowired
    private DSLContext dslContext;

    protected abstract Table<R> getDaoTable();

    protected abstract Field<UUID> getIdField();

    protected abstract Class<C> getPogoClass();

    protected DSLContext getContext() {
        return this.dslContext;
    }

    protected R convertPojoToRecord(Object pojo) {
        return this.dslContext.newRecord(getDaoTable(), pojo);
    }

    public List<C> findByIdsIntoPojos(List<UUID> idList) {
        if (CollectionUtils.isEmpty(idList)) {
            throw new IllegalArgumentException("Ids list must be set!");
        }
        return dslContext.selectFrom(getDaoTable())
                .where(getIdField().in(idList))
                .fetch()
                .into(getPogoClass());
    }

    public List<C> findAll() {
        return dslContext.selectFrom(getDaoTable())
                .fetch()
                .into(getPogoClass());
    }

    public void save(Object pojo) {
        dslContext.insertInto(getDaoTable())
                .set(convertPojoToRecord(pojo))
                .execute();
    }
}
