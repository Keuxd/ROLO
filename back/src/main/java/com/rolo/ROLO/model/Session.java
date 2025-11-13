package com.rolo.ROLO.model;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

public class Session {
	
	public final int SESSION_DURATION_MINUTES = 20;
	
	@JsonIgnore @Getter @Setter public Integer requestHash;
	@Getter @Setter public LocalDateTime sessionStart;
	
	public Session(LoginRequest request) {
		this.requestHash = request.hashCode();
		sessionStart = LocalDateTime.now();
	}
	
	@JsonIgnore
	public boolean isValid() {
		LocalDateTime currentTime = LocalDateTime.now();
		Duration durationToCheck = Duration.ofMinutes(SESSION_DURATION_MINUTES);
		
		if(currentTime.isAfter(sessionStart.plus(durationToCheck)))
			return false;
		
		return true;
	}
	
	public void resetSessionDuration() {
		sessionStart = LocalDateTime.now();
	}
	
	public void invalidateSession() {
		sessionStart = LocalDateTime.MIN;
	}
	
	public int getToken() {
		return Math.abs(Objects.hash(requestHash, sessionStart));
	}
}
