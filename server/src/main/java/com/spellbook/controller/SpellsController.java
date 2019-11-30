package com.spellbook.controller;

import com.spellbook.dto.getSpellList.GetSpellListResponse;
import com.spellbook.service.SpellbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpellsController {

    static private final String DEFAULT_URL = "/api/v1";
    static private final String GET_SPELL_LIST = "/getSpellList";

    @Autowired
    private SpellbookService spellbookService;

    @GetMapping(value = DEFAULT_URL + GET_SPELL_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public GetSpellListResponse getSpellList() {
        return spellbookService.getSpellList();
    }
}
