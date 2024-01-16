package com.cognixia.jump.exception;

public class ResourceDoesNotBelongException extends Exception{

    private static final long serialVersionUID = 1L;

    public ResourceDoesNotBelongException(String resource, String resource2) {
        super("This " + resource + " does not belong to this " + resource2 + ".");
    }

}
