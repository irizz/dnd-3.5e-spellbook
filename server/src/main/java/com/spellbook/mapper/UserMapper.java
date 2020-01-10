package com.spellbook.mapper;

import com.spellbook.dto.common.User;
import com.spellbook.jooq.tables.pojos.Users;
import com.spellbook.utils.PasswordUtils;
import org.springframework.stereotype.Component;

@Component
class UserMapper {

    public Users map(User user) {
        Users userPogo = new Users();
        userPogo.setLogin(user.login());
        String salt = PasswordUtils.getSalt();
        userPogo.setSalt(salt);
        userPogo.setPassword(PasswordUtils.generateSecurePassword(user.password(), salt));
        return userPogo;
    }
}
