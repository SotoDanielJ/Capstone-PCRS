package com.pcrs.pcrs.profile.services;


import org.springframework.stereotype.Service;

import com.pcrs.pcrs.profile.dto.BlogPostDto;
import com.pcrs.pcrs.profile.models.BlogPost;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.BlogPostRepository;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;

import java.util.ArrayList;
import java.util.List;


@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final UserProfileRepository userProfileRepository;


    public BlogPostService(BlogPostRepository blogPostRepository, UserProfileRepository userProfileRepository) {
        this.blogPostRepository = blogPostRepository;
        this.userProfileRepository = userProfileRepository;
    }

    
    public BlogPostDto createBlogPost(String username, BlogPost post) {
        UserProfileModel user = userProfileRepository.findByUsername(username);
        if (user == null) {
           
        }
        post.setUser(user); 
        BlogPost savedPost = blogPostRepository.save(post);
        return convertToDto(savedPost); 
    }
    

    public List<BlogPostDto> getAllBlogPosts() {
       List<BlogPost> allBlogPosts = blogPostRepository.findAll(); 
        return convertAllToDto(allBlogPosts);
    }
    public List<BlogPostDto> getAllBlogPostsByUser(String username) {
        List<BlogPost> usersBlogPosts = blogPostRepository.findByUserUsername(username);
        return convertAllToDto(usersBlogPosts);
    }
    
    

    public List<BlogPostDto> getBlogPostByCategory(int categoryIndex) {
        List<BlogPost> blogPost = blogPostRepository.findByCategoryIndex(categoryIndex);
        if (blogPost != null) {
            return convertAllToDto(blogPost);
        } else {
            return null;
        }
    }

    
    private BlogPostDto convertToDto(BlogPost blogPost) {

        BlogPostDto response = new BlogPostDto();
        response.setUsername(blogPost.getUser().getUsername());
        response.setTitle(blogPost.getTitle());
        response.setContent(blogPost.getContent());
        response.setCategoryIndex(blogPost.getCategoryIndex());
        return response;
    }
    
    private List<BlogPostDto> convertAllToDto(List<BlogPost> blogPosts) {
        List<BlogPostDto> dtoList = new ArrayList<>();
        for (BlogPost blogPost : blogPosts) {
            BlogPostDto dto = convertToDto(blogPost);
            dtoList.add(dto);
        }
        return dtoList;
    }
}

