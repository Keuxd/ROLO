package com.rolo.ROLO.model;

import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

public class LoginRequest {
	
	@Getter @Setter public String email;
	@Getter @Setter public String senha;
	
	@Override
	public int hashCode() {
		return Objects.hash(email, senha);
	}
}
