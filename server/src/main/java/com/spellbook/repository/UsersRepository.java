package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.Users;
import com.spellbook.jooq.tables.records.UsersRecord;
import org.jooq.Field;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.spellbook.jooq.Tables.USERS;

@Repository
@Transactional
public class UsersRepository extends DefaultRepository<Users, UsersRecord> {

    @Override
    protected Table<UsersRecord> getDaoTable() {
        return USERS;
    }

    @Override
    protected Field<UUID> getIdField() {
        return USERS.ID;
    }

    @Override
    protected Class<Users> getPogoClass() {
        return Users.class;
    }

    public Users getUserByLogin(String login) {
        return getContext().select()
                .from(USERS)
                .where(USERS.LOGIN.eq(login))
                .fetchOneInto(getPogoClass());
    }
}
