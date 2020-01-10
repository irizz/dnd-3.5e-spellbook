package com.spellbook.controller;

import com.spellbook.dto.GetClassesListResponse;
import com.spellbook.service.SpellbookService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static com.spellbook.utils.ControllerUtils.DEFAULT_URL;

@CrossOrigin
@RestController
@AllArgsConstructor
public class ClassController
{
    private static final String GET_CLASSES_LIST = "/getClassesList";

    private final SpellbookService spellbookService;

    @GetMapping(value = DEFAULT_URL + GET_CLASSES_LIST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public GetClassesListResponse getClassesList() {
        return spellbookService.getClassesList();
    }
}
