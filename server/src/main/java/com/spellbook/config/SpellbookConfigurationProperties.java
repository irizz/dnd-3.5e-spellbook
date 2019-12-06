package com.spellbook.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("spellbook")
public class SpellbookConfigurationProperties {
    private String username;
    private String password;
    private String allowedIp;
}
