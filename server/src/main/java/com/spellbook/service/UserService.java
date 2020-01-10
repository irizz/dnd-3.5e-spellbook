package com.spellbook.service;

import com.spellbook.dto.common.User;
import com.spellbook.jooq.tables.pojos.Users;
import com.spellbook.mapper.Mapper;
import com.spellbook.repository.UsersRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private static final String ANONYMOUS_USER = "anonymousUser";

    private final UsersRepository userRepository;
    private final Mapper mapper;

    public HttpStatus createUser(User user) {
        if (Objects.nonNull(findByLogin(user.login()))) {
            log.warn("User with login '{}' already exist.", user.login());
            return HttpStatus.CONFLICT;
        }
        userRepository.save(mapper.mapUser(user));
        log.info("User with login '{}' successfully registered", user.login());
        return HttpStatus.OK;
    }

    public Users findByLogin(String login) {
        return Optional.ofNullable(userRepository.getUserByLogin(login))
                .orElse(null);
    }

    public UUID getUserIdFromContext() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .map(String::valueOf)
                .map(userRepository::getUserByLogin)
                .map(Users::getId)
                .orElseThrow(() -> new RuntimeException("Cant get user id"));
    }

    public HttpStatus logout(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.nonNull(authentication)) {
            new SecurityContextLogoutHandler().logout(request, null, authentication);
            log.info("User with login '{}' successfully logout.", authentication.getPrincipal());
        }
        return HttpStatus.OK;
    }

    public HttpStatus checkSession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(auth) || Objects.equals(ANONYMOUS_USER, auth.getName())) {
            return HttpStatus.UNAUTHORIZED;
        }
        return HttpStatus.OK;
    }
}