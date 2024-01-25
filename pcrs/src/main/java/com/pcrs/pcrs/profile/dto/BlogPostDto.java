package com.pcrs.pcrs.profile.dto;



public class BlogPostDto {

    private String title;
    private String content;
    private int categoryIndex;
    private String username;

    public BlogPostDto(String title, String content, int categoryIndex, String username) {
        this.title = title;
        this.content = content;
        this.categoryIndex = categoryIndex;
        this.username = username;
    }

    public BlogPostDto() {
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

    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getCategoryIndex() {
        return categoryIndex;
    }

    public void setCategoryIndex(int categoryIndex) {
        this.categoryIndex = categoryIndex;
    }

}
