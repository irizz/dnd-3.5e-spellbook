package com.spellbook.security;

import com.spellbook.jooq.tables.pojos.Users;
import com.spellbook.service.UserService;
import com.spellbook.utils.PasswordUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Objects;

@Slf4j
@Component
@AllArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserService usersService;

    @Override
    public Authentication authenticate(Authentication authentication) {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        if (authorization(name, password)) {
            return new UsernamePasswordAuthenticationToken(name, password, Collections.emptyList());
        }
        return null;
    }

    private boolean authorization(String name, String password) {
        Users user = usersService.findByLogin(name);
        return Objects.nonNull(user)
                && PasswordUtils.verifyUserPassword(password, user.getPassword(), user.getSalt());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
