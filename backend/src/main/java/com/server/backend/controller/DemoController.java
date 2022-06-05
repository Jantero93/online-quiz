package com.server.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {


  @GetMapping("/")
  String home() {
    return "HELLO FROM SERVER!";
  }

  @GetMapping("/test")
  String test() {
    return "test test test";
  }
}
