package com.pcrs.pcrs.profile.models;

import jakarta.persistence.*;

@Entity
@Table(name = "blog_posts")
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private int categoryIndex;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfileModel user;

    public BlogPost() {
    }

    public BlogPost(String title, String content, int categoryIndex, UserProfileModel user) {
        this.title = title;
        this.content = content;
        this.categoryIndex = categoryIndex;
        this.user = user;
    }

    public UserProfileModel getUser() {
        return user;
    }

    public void setUser(UserProfileModel user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCategoryIndex() {
        return categoryIndex;
    }

    public void setCategoryIndex(int categoryIndex) {
        this.categoryIndex = categoryIndex;
    }

}
