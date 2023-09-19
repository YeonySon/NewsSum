package com.ssafy.newsum.domain.users.entity;

import com.ssafy.newsum.domain.techstack.entity.TechStack;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "preferred_stack")
@Getter
public class PreferredTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer prefTsId;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stack_id")
    private TechStack techStack;

}
