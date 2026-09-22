//package com.EMS.dao;
//
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.EMS.entity.User;
//
//public interface UserDao extends JpaRepository<User, Integer> {
//
// 
//    Optional<User> findByUsername(String username);
//
//    
//    boolean existsByUsername(String username);
//
//}
package com.EMS.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EMS.entity.User;

public interface UserDao
        extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}

