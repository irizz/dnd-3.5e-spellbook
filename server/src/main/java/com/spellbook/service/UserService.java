package com.spellbook.service;

import com.spellbook.dto.common.User;
import com.spellbook.jooq.tables.pojos.Users;
import com.spellbook.repository.UsersRepository;
import com.spellbook.utils.PasswordUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private static final String ANONYMOUS_USER = "anonymousUser";

    private final UsersRepository userRepository;

    public ResponseEntity<HttpStatus> save(User user) {
        if (Objects.nonNull(findByLogin(user.login()))) {
            log.warn("User with login '{}' already exist.", user.login());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userRepository.save(createUser(user.login(), user.password()));
        log.info("User with login '{}' successfully registered", user.login());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Users createUser(String login, String password) {
        Users user = new Users();
        user.setLogin(login);
        String salt = PasswordUtils.getSalt();
        user.setSalt(salt);
        user.setPassword(PasswordUtils.generateSecurePassword(password, salt));
        return user;
    }

    public Users findByLogin(String login) {
        return Optional.ofNullable(userRepository.getUserByLogin(login))
                .orElse(null);
    }

    public ResponseEntity<HttpStatus> logout(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.nonNull(authentication)) {
            new SecurityContextLogoutHandler().logout(request, null, authentication);
            log.info("User with login '{}' successfully logout.", authentication.getPrincipal());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> checkSession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(auth) || Objects.equals(ANONYMOUS_USER, auth.getName())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}