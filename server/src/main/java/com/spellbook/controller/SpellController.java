package com.spellbook.controller;

import com.spellbook.dto.FavoriteSpell;
import com.spellbook.dto.GetSpellsListResponse;
import com.spellbook.service.SpellbookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.Callable;

import static com.spellbook.utils.ControllerUtils.DEFAULT_URL;

@Slf4j
@CrossOrigin
@RestController
@AllArgsConstructor
public class SpellController {

    private static final String GET_SPELLS_LIST = "/getSpellsList";
    private static final String GET_SPELLS_LIST_BY_CLASS = "/getSpellsListByClass";
    private static final String ADD_FAVORITE_SPELL = "/addFavoriteSpell";
    private static final String REMOVE_FAVORITE_SPELL = "/removeFavoriteSpell";
    private static final String GET_FAVORITE_SPELLS_LIST = "/getFavoriteSpellsList";

    private final SpellbookService spellbookService;

    @GetMapping(value = DEFAULT_URL + GET_SPELLS_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<GetSpellsListResponse> getSpellsList() {
        return processWithResponse(spellbookService::getSpellsList);
    }

    @GetMapping(value = DEFAULT_URL + GET_SPELLS_LIST_BY_CLASS, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<GetSpellsListResponse> getSpellsListByClass(@RequestParam("classId") UUID classId) {
        return processWithResponse(() -> spellbookService.getSpellsListByClass(classId));
    }

    @PostMapping(value = DEFAULT_URL + ADD_FAVORITE_SPELL, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<HttpStatus> addFavoriteSpell(@RequestBody FavoriteSpell favoriteSpell) {
        return processWithoutResponse(() -> spellbookService.addFavoriteSpell(favoriteSpell));
    }

    @PostMapping(value = DEFAULT_URL + REMOVE_FAVORITE_SPELL, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<HttpStatus> removeFavoriteSpell(@RequestBody FavoriteSpell favoriteSpell) {
        return processWithoutResponse(() -> spellbookService.removeFavoriteSpell(favoriteSpell));
    }

    @GetMapping(value = DEFAULT_URL + GET_FAVORITE_SPELLS_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<GetSpellsListResponse> getFavoriteSpellsList(@RequestParam("classId") UUID classId) {
        return processWithResponse(() -> spellbookService.getFavoriteSpellsList(classId));
    }

    private ResponseEntity<GetSpellsListResponse> processWithResponse(Callable<GetSpellsListResponse> method) {
        try {
            return new ResponseEntity<>(method.call(), HttpStatus.OK);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            log.error(Arrays.toString(exception.getStackTrace()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<HttpStatus> processWithoutResponse(Callable<HttpStatus> method) {
        try {
            return new ResponseEntity<>(method.call());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            log.error(Arrays.toString(exception.getStackTrace()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
