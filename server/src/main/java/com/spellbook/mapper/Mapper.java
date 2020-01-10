package com.spellbook.mapper;

import com.spellbook.dto.FavoriteSpell;
import com.spellbook.dto.GetClassesListResponse;
import com.spellbook.dto.GetSpellsListResponse;
import com.spellbook.dto.common.User;
import com.spellbook.jooq.tables.pojos.Classes;
import com.spellbook.jooq.tables.pojos.Spells;
import com.spellbook.jooq.tables.pojos.UserFavoriteSpells;
import com.spellbook.jooq.tables.pojos.Users;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@AllArgsConstructor
public class Mapper {

    private final GetSpellsListMapper getSpellsListMapper;
    private final GetClassesListMapper getClassesListMapper;
    private final UserFavoriteSpellsMapper userFavoriteSpellsMapper;
    private final UserMapper userMapper;

    public GetSpellsListResponse mapSpellsList(List<Spells> spellsList) {
        return Optional.ofNullable(spellsList)
                .map(getSpellsListMapper::map)
                .orElse(new GetSpellsListResponse(Collections.emptyList()));
    }

    public GetClassesListResponse mapClassesList(List<Classes> classList) {
        return Optional.ofNullable(classList)
                .map(getClassesListMapper::map)
                .orElse(new GetClassesListResponse(Collections.emptyList()));
    }

    public Users mapUser(User user) {
        return userMapper.map(user);
    }

    public UserFavoriteSpells mapUserFavoriteSpell(FavoriteSpell favoriteSpell, UUID userId) {
        return userFavoriteSpellsMapper.map(favoriteSpell, userId);
    }
}
