package com.cognixia.jump.exception;

public class InvalidUpdateException extends Exception{

    private static final long serialVersionUID = 1L;

    public InvalidUpdateException(String resource) {
        super("Cannot update this " + resource + " with itself.");
    }
}
