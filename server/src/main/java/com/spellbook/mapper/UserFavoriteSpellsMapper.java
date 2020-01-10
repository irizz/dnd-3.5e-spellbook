package com.spellbook.mapper;

import com.spellbook.dto.FavoriteSpell;
import com.spellbook.jooq.tables.pojos.UserFavoriteSpells;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
class UserFavoriteSpellsMapper {

    UserFavoriteSpells map(FavoriteSpell favoriteSpell, UUID userId) {
        UserFavoriteSpells userFavoriteSpell = new UserFavoriteSpells();
        userFavoriteSpell.setUserId(userId);
        userFavoriteSpell.setClassId(favoriteSpell.getClassId());
        userFavoriteSpell.setSpellId(favoriteSpell.getId());
        return userFavoriteSpell;
    }
}
