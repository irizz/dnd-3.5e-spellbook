package com.spellbook.security;

import com.spellbook.config.SpellbookConfigurationProperties;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.savedrequest.NullRequestCache;

import static com.spellbook.utils.ControllerUtils.DEFAULT_URL;

@Slf4j
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class CustomWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final SpellbookConfigurationProperties properties;

    @Autowired
    public void globalConfig(AuthenticationManagerBuilder authBuilder) {
        authBuilder.authenticationProvider(customAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .requestCache()
                    .requestCache(new NullRequestCache())
                .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .and()
                .authorizeRequests()
                    .antMatchers(DEFAULT_URL + "/getFavoriteSpellsList").authenticated()
                    .antMatchers(DEFAULT_URL + "/login").authenticated()
                    .antMatchers(DEFAULT_URL + "/logout").authenticated()
                    .anyRequest().permitAll()
                .and()
                .cors()
                .and()
                .csrf()
                    .disable()
                    .exceptionHandling()
                .and()
                .httpBasic();
    }

    @EventListener
    public void auditEventHappened(AuditApplicationEvent auditApplicationEvent) {
        AuditEvent auditEvent = auditApplicationEvent.getAuditEvent();
        log.info("Principal " + auditEvent.getPrincipal() + "-" + auditEvent.getType());
        WebAuthenticationDetails details = (WebAuthenticationDetails) auditEvent.getData().get("details");
        log.info("Remote IP: " + details.getRemoteAddress());
    }
}
