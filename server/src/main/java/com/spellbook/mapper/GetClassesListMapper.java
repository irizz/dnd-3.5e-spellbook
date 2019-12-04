package com.spellbook.mapper;

import com.spellbook.dto.common.Class;
import com.spellbook.dto.getSpellList.GetClassesListResponse;
import com.spellbook.jooq.tables.pojos.Classes;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
class GetClassesListMapper {

    GetClassesListResponse map(List<Classes> classes) {
        List<Class> classesList = new ArrayList<>();
        classes.forEach(x ->
                classesList.add(new Class()
                        .id(x.getId())
                        .name(x.getName())));
        return new GetClassesListResponse(classesList);
    }
}
