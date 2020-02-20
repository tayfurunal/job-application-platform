package com.tayfurunal.hrapplication.service.impl;

import com.tayfurunal.hrapplication.domain.Role;
import com.tayfurunal.hrapplication.domain.RoleType;
import com.tayfurunal.hrapplication.domain.User;
import com.tayfurunal.hrapplication.payload.request.LoginRequest;
import com.tayfurunal.hrapplication.payload.request.SignupRequest;
import com.tayfurunal.hrapplication.payload.response.JwtResponse;
import com.tayfurunal.hrapplication.repository.RoleRepository;
import com.tayfurunal.hrapplication.repository.UserRepository;
import com.tayfurunal.hrapplication.security.jwt.JwtTokenProvider;
import com.tayfurunal.hrapplication.security.service.UserDetailsImpl;
import com.tayfurunal.hrapplication.service.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    final UserRepository userRepository;

    final
    PasswordEncoder encoder;

    final
    RoleRepository roleRepository;

    final
    AuthenticationManager authenticationManager;

    final
    JwtTokenProvider jwtTokenProvider;

    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder encoder,
                                     RoleRepository roleRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public void createUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new IllegalArgumentException("Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use!");
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role applicantRole = roleRepository.findByName(RoleType.ROLE_APPLICANT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(applicantRole);
        } else {
            strRoles.forEach(role -> {
                if ("hr".equals(role)) {
                    Role hrRole = roleRepository.findByName(RoleType.ROLE_HR)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(hrRole);
                } else {
                    Role applicantRole = roleRepository.findByName(RoleType.ROLE_APPLICANT)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(applicantRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }
}
