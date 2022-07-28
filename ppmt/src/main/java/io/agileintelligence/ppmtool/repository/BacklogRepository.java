package io.agileintelligence.ppmtool.repository;

import io.agileintelligence.ppmtool.domain.Backlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BacklogRepository extends JpaRepository<Backlog, Long> {

    Backlog findByProjectIdentifier(String Identifier);
}
