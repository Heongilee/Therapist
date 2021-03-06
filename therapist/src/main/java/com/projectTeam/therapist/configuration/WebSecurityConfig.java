package com.projectTeam.therapist.configuration;

import com.projectTeam.therapist.jwt.JwtAccessDeniedHandler;
import com.projectTeam.therapist.jwt.JwtAuthenticationEntryPoint;
import com.projectTeam.therapist.jwt.JwtSecurityConfig;
import com.projectTeam.therapist.jwt.TokenProvider;
import com.projectTeam.therapist.userService.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Configuration
    @Order(1)
    public static class BasicAuthWebSecurityConfigurationAdapter  extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .cors().and()
                    .antMatcher("/api/openvidu/**")
                    .csrf().disable().formLogin().disable()
                    .authorizeRequests(authorize -> authorize.anyRequest().hasRole("OPENVIDU"))
                    .httpBasic(Customizer.withDefaults());
        }

        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth.inMemoryAuthentication()
                    .withUser("OPENVIDUAPP").password(passwordEncoder().encode("therapist"))
                    .roles("OPENVIDU");
        }

        // ????????? ????????? ???????????? ????????? ??? ??? ?????? ????????? ??????
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    } // BasicAuthWebSecurityConfigurationAdapter

    @Configuration
    public static class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        @Autowired
        private DataSource dataSource; // ????????? ??????????????? ?????? ?????? ???????????? application.properties??? ?????? ???????????? ????????? ??? ????????? ????????? dataSource

        private final TokenProvider tokenProvider;
        private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
        private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
        public ApiWebSecurityConfigurationAdapter(
                TokenProvider tokenProvider,
                JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                JwtAccessDeniedHandler jwtAccessDeniedHandler
        ) {
            this.tokenProvider = tokenProvider;
            this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
            this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .cors().and().csrf().disable()                                                                                // ????????? csrf(Cross-Site Request Forgery)????????? ?????? ???????????? disable(?????????)?????????. (????????? ???????????? ???????????? disable ????????? ?????????, ?????? ??????????????? ????????? ????????? ???????????? ???????????? ??? ?????? ????????? ??????.)

                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()

                    .exceptionHandling()
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                    .accessDeniedHandler(jwtAccessDeniedHandler)
                    .and()

                    .authorizeRequests()

                    .antMatchers("/socket").permitAll()
                    .antMatchers("/api/main/posts").permitAll()
                    .antMatchers("/api/main/voiceChatRoom").permitAll()
                    .antMatchers("/api/account/register").permitAll()
                    .antMatchers("/api/auth/**").permitAll()
                    .antMatchers("/", "/css/**", "/js/**", "/img/**").permitAll() 	                            // "/"??????, "/home"?????? URI??? ????????? ????????? ??? ??????, ?????? css ?????? ????????? ????????? ???????????? css???????????? ????????? ?????? ????????? ??? ??? ??????.
                    .anyRequest().authenticated()			                                                                // ??? ?????? ?????? ????????? ????????????, ?????? ??????(authenticated)??? ????????? ??????.

                    .and()							                                                                        // and()??? ?????????, authorizeRequests??? ?????? ??????.
                    .apply(new JwtSecurityConfig(tokenProvider));
        }

        // ??????????????? ????????? ?????????
        /* ///// ?????? ?????? /////
         * Authentication(??????) : ???????????? ?????? ????????? ?????? ??????
         * Authorization(??????) : ????????? ??? ????????? ????????? ?????? ????????? ?????? ?????? */
        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth
                    .jdbcAuthentication()
                    .dataSource(dataSource)
                    .usersByUsernameQuery("select user_name, user_password, user_enabled "
                            + "from user_dto "
                            + "where user_name = ?")
                    .authoritiesByUsernameQuery("select u.user_name, r.role_name "
                            + "from user_role_dto ur "
                            + "inner join user_dto u on ur.user_id = u.user_id "
                            + "inner join role_dto r on ur.role_id = r.role_id "
                            + "where u.user_name = ?");
        }
    } // ApiWebSecurityConfigurationAdapter
}