package com.spellbook.repository;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Table;
import org.jooq.UpdatableRecord;
import org.jooq.exception.MappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.UUID;

@Component
public abstract class DefaultRepository<C, R extends UpdatableRecord<R>> {

    @Autowired
    protected DSLContext dslContext;

    public DSLContext getContext() {
        return this.dslContext;
    }

//    public R convertPojoToRecord(Object pojo) {
//        return this.dslContext.newRecord(getDaoTable(), pojo);
//    }

    public List<C> findByIdsIntoPojos(List<UUID> idList) throws MappingException {
        if (CollectionUtils.isEmpty(idList)) {
            throw new IllegalArgumentException("Ids list must be set!");
        }
        return dslContext.selectFrom(getDaoTable())
                .where(getIdField().in(idList))
                .fetch()
                .into(getPogoClass());
    }

    public List<C> findAll() throws MappingException {
        return dslContext.selectFrom(getDaoTable())
                .fetch()
                .into(getPogoClass());
    }

    protected abstract Table<R> getDaoTable();

    protected abstract Field<UUID> getIdField();

    protected abstract Class<C> getPogoClass();
}
