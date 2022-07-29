package io.agileintelligence.ppmtool.repository;

import io.agileintelligence.ppmtool.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User getById(Long id);
}
