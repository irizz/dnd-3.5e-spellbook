package com.spellbook.service;

import com.spellbook.dto.FavoriteSpell;
import com.spellbook.dto.GetClassesListResponse;
import com.spellbook.dto.GetSpellsListResponse;
import com.spellbook.mapper.Mapper;
import com.spellbook.repository.ClassesRepository;
import com.spellbook.repository.SpellsRepository;
import com.spellbook.repository.UserFavoriteSpellsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class SpellbookService {

    private final SpellsRepository spellsRepository;
    private final ClassesRepository classesRepository;
    private final UserFavoriteSpellsRepository userFavoriteSpellsRepository;
    private final UserService userService;
    private final Mapper mapper;

    public GetSpellsListResponse getSpellsList() {
        return mapper.mapSpellsList(spellsRepository.findAll());
    }

    public GetSpellsListResponse getSpellsListByClass(UUID classId) {
        return mapper.mapSpellsList(spellsRepository.findSpellsListByClass(classId));
    }

    public GetSpellsListResponse getFavoriteSpellsList(UUID classId) {
        return mapper.mapSpellsList(
                userFavoriteSpellsRepository.getFavoriteSpellsListByUserAndClass(
                        userService.getUserIdFromContext(),
                        classId
                ));
    }

    public HttpStatus addFavoriteSpell(FavoriteSpell favoriteSpell) {
        userFavoriteSpellsRepository.addFavoriteSpell(
                mapper.mapUserFavoriteSpell(
                        favoriteSpell,
                        userService.getUserIdFromContext()
                )
        );
        return HttpStatus.OK;
    }

    public HttpStatus removeFavoriteSpell(FavoriteSpell favoriteSpell) {
        userFavoriteSpellsRepository.removeFavoriteSpell(
                mapper.mapUserFavoriteSpell(
                        favoriteSpell,
                        userService.getUserIdFromContext()
                )
        );
        return HttpStatus.OK;
    }

    public GetClassesListResponse getClassesList() {
        return mapper.mapClassesList(classesRepository.findAll());
    }
}
