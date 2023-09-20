package com.ssafy.newsum.domain.users.entity;

import com.ssafy.newsum.domain.company.entity.Company;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "preferred_company")
@Getter
public class PreferredCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer prefComId;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cp_id")
    private Company company;
}
