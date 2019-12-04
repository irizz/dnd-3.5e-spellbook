package com.spellbook.controller;

import com.spellbook.dto.getSpellList.GetClassesListResponse;
import com.spellbook.dto.getSpellList.GetSpellsListResponse;
import com.spellbook.service.SpellbookService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@CrossOrigin
@RestController
@AllArgsConstructor
public class Controller {

    static private final String DEFAULT_URL = "/api/v1";
    static private final String GET_SPELLS_LIST = "/getSpellsList";
    static private final String GET_SPELLS_LIST_BY_CLASS = "/getSpellsListByClass";
    static private final String GET_CLASSES_LIST = "/getClassesList";

    private final SpellbookService spellbookService;

    @GetMapping(value = DEFAULT_URL + GET_SPELLS_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public GetSpellsListResponse getSpellsList() {
        return spellbookService.getSpellsList();
    }

    @GetMapping(value = DEFAULT_URL + GET_SPELLS_LIST_BY_CLASS, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public GetSpellsListResponse getSpellsListByClass(@RequestParam("classId") UUID classId) {
        return spellbookService.getSpellsListByClass(classId);
    }

    @GetMapping(value = DEFAULT_URL + GET_CLASSES_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public GetClassesListResponse getClassesList() {
        return spellbookService.getClassesList();
    }
}
