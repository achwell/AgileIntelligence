package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User saveUser(User newUser) {
        if(userRepository.findByUsername(newUser.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " exists");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setConfirmPassword("");
        return userRepository.save(newUser);
    }
}
