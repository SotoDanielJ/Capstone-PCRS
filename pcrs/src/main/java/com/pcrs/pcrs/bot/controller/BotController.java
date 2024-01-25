package com.pcrs.pcrs.bot.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.Buffer;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.pcrs.pcrs.bot.Reader;
import com.pcrs.pcrs.bot.dto.ChatRequest;
import com.pcrs.pcrs.bot.dto.ChatResponse;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/bot")
// @CrossOrigin(origins = "localhost:3000")
public class BotController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HttpSession httpSession;  // Inject HttpSession

    @GetMapping("/chat")
    public String chat(@RequestParam("prompt") String prompt) {
        try {
            // Check if it's the first message by checking the session attribute
            boolean isFirstMessage = httpSession.getAttribute("isFirstMessage") == null;
            
            if (isFirstMessage) {
                // Read conditions from the file only for the first message
                Reader reader = new Reader();
                String conditions = String.join(" ", reader.checkFile("src\\main\\java\\com\\pcrs\\pcrs\\bot\\conditions.txt"));
                // Append conditions to the prompt
                prompt = conditions + " " + prompt;
                
                // Set the session attribute to indicate that it's no longer the first message
                httpSession.setAttribute("isFirstMessage", false);
            }

            // Create ChatRequest and send the request to the API
            ChatRequest request = new ChatRequest(model, prompt);
            ChatResponse chatResponse = restTemplate.postForObject(apiURL, request, ChatResponse.class);

            // Return the AI response
            return chatResponse.getChoices().get(0).getMessage().getContent();
        } catch (Exception e) {
            return "Error processing the chat request. " + e.getMessage();
        }
    }


    @GetMapping("/selection")
    public Map<String, String> chat(
            @RequestParam("question") String question,
            @RequestParam("prompt") String prompt) {
        Map<String, String> responseMap = new HashMap<>();

        try {
            String conditionatedPrompt = "" + prompt;
            ChatRequest request = new ChatRequest(model, conditionatedPrompt);

            ChatResponse chatResponse = restTemplate.postForObject(apiURL, request, ChatResponse.class);

            String response = chatResponse.getChoices().get(0).getMessage().getContent();

            responseMap.put("question", question);
            responseMap.put("answer", response);
        } catch (Exception e) {
            responseMap.put("error", "Error processing the chat request. " + e.getMessage());
        }

        return responseMap;
    }
}