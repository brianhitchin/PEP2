package com.cognixia.jump.exception;

public class InvalidLoginException extends Exception{

    private static final long serialVersionUID = 1L;

    public InvalidLoginException() {
        super("Invalid username or password. Please try again.");
    }

}
