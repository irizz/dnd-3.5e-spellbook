package com.spellbook.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

@Slf4j
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class CustomWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

    private final SpellbookConfigurationProperties properties;

    private static final String USER = "USER";

    @Autowired
    public void globalConfig(AuthenticationManagerBuilder authBuilder) throws Exception {
        authBuilder.inMemoryAuthentication()
                .withUser(properties.getUsername())
                .password(passwordEncoder().encode(properties.getPassword()))
                .authorities(USER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .and()
                .csrf()
                    .disable()
                    .exceptionHandling()
                .and()
                .authorizeRequests()
                    .anyRequest().hasIpAddress(properties.getAllowedIp())
                    .anyRequest().authenticated()
                .and()
                .cors()
                .and()
                .httpBasic();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @EventListener
    public void auditEventHappened(AuditApplicationEvent auditApplicationEvent) {
        AuditEvent auditEvent = auditApplicationEvent.getAuditEvent();
        log.info("Principal " + auditEvent.getPrincipal() + "-" + auditEvent.getType());
        WebAuthenticationDetails details = (WebAuthenticationDetails) auditEvent.getData().get("details");
        log.info("Remote IP: " + details.getRemoteAddress());
        log.info("Session Id: " + details.getSessionId());
    }
}
