package com.rolo.ROLO.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.rolo.ROLO.service.DatabaseService;

public abstract class BaseEndpoints<T> {
	
	protected String tableName;
	protected String idField;
	
	public BaseEndpoints(String tableName, String idField) {
		this.tableName = tableName;
		this.idField = idField;
	}
	
	@Autowired
	protected DatabaseService service;
	
	@GetMapping
	public List<Map<String,Object>> getAll() {
		 return service.getAll(tableName);
	}
	
	@GetMapping("{id}")
	public List<Map<String,Object>> getById(@PathVariable int id) {
		 return service.getByField(tableName, idField, id);
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody T request) {
		service.create(tableName, request);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {
		service.deleteByField(tableName, idField, id);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}
