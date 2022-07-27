package io.agileintelligence.ppmt.repository;

import io.agileintelligence.ppmt.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByProjectIdentifier(String projectid);
}
