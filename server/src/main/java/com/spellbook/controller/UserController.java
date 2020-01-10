package com.spellbook.controller;

import com.spellbook.dto.common.User;
import com.spellbook.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.concurrent.Callable;

import static com.spellbook.utils.ControllerUtils.DEFAULT_URL;

@Slf4j
@CrossOrigin
@RestController
@AllArgsConstructor
public class UserController {

    private static final String REGISTRATION = "/registration";
    private static final String LOGIN = "/login";
    private static final String LOGOUT = "/logout";
    private static final String CHECK_SESSION = "/checkSession";

    private final UserService userService;

    @PostMapping(value = DEFAULT_URL + REGISTRATION)
    public ResponseEntity<HttpStatus> registration(@RequestBody User user) {
        return process(() -> userService.createUser(user));
    }

    @GetMapping(value = DEFAULT_URL + LOGIN)
    public ResponseEntity<HttpStatus> login() {
        log.info("User with login '{}' successfully logged in.", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = DEFAULT_URL + LOGOUT)
    public ResponseEntity<HttpStatus> logout(HttpServletRequest request) {
        return process(() -> userService.logout(request));
    }

    @GetMapping(value = DEFAULT_URL + CHECK_SESSION)
    public ResponseEntity<HttpStatus> checkSession() {
        return process(userService::checkSession);
    }

    private ResponseEntity<HttpStatus> process(Callable<HttpStatus> method) {
        try {
            return new ResponseEntity<>(method.call());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            log.error(Arrays.toString(exception.getStackTrace()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
