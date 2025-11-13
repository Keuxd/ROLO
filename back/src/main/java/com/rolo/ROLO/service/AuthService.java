package com.rolo.ROLO.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rolo.ROLO.model.LoginRequest;
import com.rolo.ROLO.model.Session;

@Service
public class AuthService {
	
	@Autowired
	private DBQueryService queryService;

	private ArrayList<Session> sessions = new ArrayList<>();
	
	public ResponseEntity<Session> validateLogin(LoginRequest request) {
		if(request.email.split(" ").length > 1 || request.senha.split(" ").length > 1)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		
		String sql = String.format(
				"SELECT senha FROM USUARIOS "
				+ "WHERE email = '%s' and senha = '%s'",
				request.email, request.senha);
		List<Map<String, Object>> queryResponse = queryService.rawQuery(sql);
		
		if(queryResponse.size() == 0)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		
		Session session = new Session(request);
		sessions.add(session);		
		
		return ResponseEntity.status(HttpStatus.OK).body(session);
	}
	
	public boolean sessionExists(LoginRequest request) {
		for(Session session : sessions) {
			if(session.requestHash == request.hashCode()) {
				return true;
			}
		}
		return false;
	}
	
	public void invalidateSession(Integer sessionToken) {
		for(Session session : sessions) {
			if(session.getToken() == sessionToken) {
				session.invalidateSession();
				break;
			}
		}
		revalidateSessions();
	}
	
	public void revalidateSessions() {
		for(Session session : sessions) {
			if(!session.isValid())
				sessions.remove(session);
		}
		System.out.println("Active Sessions: " + sessions.size());
	}
}
