package com.cognixia.jump.exception;

public class ResourceAlreadyExistsException extends Exception{

    private static final long serialVersionUID = 1L;

    public ResourceAlreadyExistsException(String resource) {
        super(resource + " already exists.");
    }

}
