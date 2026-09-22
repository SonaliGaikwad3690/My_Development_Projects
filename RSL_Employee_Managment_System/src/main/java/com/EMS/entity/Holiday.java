package com.EMS.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "holidays")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Holiday {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String name;

@Column(nullable = false)
private String type;

@Column(precision = 5, scale = 2, nullable = false)
private BigDecimal duration;

@Column(length = 500)
private String description;

@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
    name = "holiday_employees",
    joinColumns = @JoinColumn(name = "holiday_id"),
    inverseJoinColumns = @JoinColumn(name = "emp_id")
)
@JsonIgnoreProperties({
    "holidays",
    "hibernateLazyInitializer",
    "handler"
})
private Set<Employee> employees = new HashSet<>();

@Column(columnDefinition = "TINYINT", nullable = false)
private Integer status = 1;

@Column(name = "created_at", nullable = false, updatable = false)
private LocalDateTime createdAt;

@Column(name = "updated_at")
private LocalDateTime updatedAt;

@PrePersist
protected void onCreate() {

    LocalDateTime now = LocalDateTime.now();

    createdAt = now;
    updatedAt = now;

    if (status == null) {
        status = 1;
    }
}

@PreUpdate
protected void onUpdate() {
    updatedAt = LocalDateTime.now();
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getType() {
    return type;
}

public void setType(String type) {
    this.type = type;
}

public BigDecimal getDuration() {
    return duration;
}

public void setDuration(BigDecimal duration) {
    this.duration = duration;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public Set<Employee> getEmployees() {
    return employees;
}

public void setEmployees(Set<Employee> employees) {
    this.employees = employees;
}

public Integer getStatus() {
    return status;
}

public void setStatus(Integer status) {
    this.status = status;
}

public LocalDateTime getCreatedAt() {
    return createdAt;
}

public LocalDateTime getUpdatedAt() {
    return updatedAt;
}


}
