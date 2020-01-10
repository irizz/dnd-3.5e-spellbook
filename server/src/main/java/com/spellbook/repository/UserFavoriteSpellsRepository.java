package com.spellbook.repository;

import com.spellbook.jooq.tables.pojos.Spells;
import com.spellbook.jooq.tables.pojos.UserFavoriteSpells;
import com.spellbook.jooq.tables.records.UserFavoriteSpellsRecord;
import org.jooq.Field;
import org.jooq.Table;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.spellbook.jooq.Tables.SPELLS;
import static com.spellbook.jooq.Tables.USER_FAVORITE_SPELLS;

@Repository
@Transactional
public class UserFavoriteSpellsRepository extends DefaultRepository<UserFavoriteSpells, UserFavoriteSpellsRecord> {

    @Override
    protected Table<UserFavoriteSpellsRecord> getDaoTable() {
        return USER_FAVORITE_SPELLS;
    }

    @Override
    protected Field<UUID> getIdField() {
        return USER_FAVORITE_SPELLS.ID;
    }

    @Override
    protected Class<UserFavoriteSpells> getPogoClass() {
        return UserFavoriteSpells.class;
    }

    public void addFavoriteSpell(UserFavoriteSpells userFavoriteSpell) {
        getContext().insertInto(getDaoTable())
                .set(convertPojoToRecord(userFavoriteSpell))
                .execute();
    }

    public void removeFavoriteSpell(UserFavoriteSpells userFavoriteSpell) {
        getContext().delete(getDaoTable())
                .where(USER_FAVORITE_SPELLS.SPELL_ID.eq(userFavoriteSpell.getSpellId()))
                .and(USER_FAVORITE_SPELLS.CLASS_ID.eq(userFavoriteSpell.getClassId()))
                .and(USER_FAVORITE_SPELLS.USER_ID.eq(userFavoriteSpell.getUserId()))
                .execute();
    }

    public List<Spells> getFavoriteSpellsListByUserAndClass(UUID userId, UUID classId) {
        return getContext().select(SPELLS.asterisk())
                .from(SPELLS)
                .join(USER_FAVORITE_SPELLS).on(SPELLS.ID.eq(USER_FAVORITE_SPELLS.SPELL_ID))
                .where(USER_FAVORITE_SPELLS.USER_ID.eq(userId))
                .and(USER_FAVORITE_SPELLS.CLASS_ID.eq(classId))
                .fetch()
                .into(Spells.class);
    }
}
