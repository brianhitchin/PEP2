package com.cognixia.jump.exception;

public class ManagerHasTeamException extends Exception{

    private static final long serialVersionUID = 1L;

    public ManagerHasTeamException(String resource, int id) {
        super("Manager already has a team");
    }

}
