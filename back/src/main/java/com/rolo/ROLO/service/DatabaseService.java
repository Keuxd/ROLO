package com.rolo.ROLO.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {
	
	@Autowired
	private DBQueryService queryService;
	
	public List<Map<String,Object>> getAll(String tableName) {
		return queryService.rawQuery("SELECT * FROM " + tableName);
	}
	
	public List<Map<String,Object>> getByField(String tableName, String fieldName, Object value) {
		return queryService.rawQuery(String.format(
				"SELECT * FROM %s WHERE %s = " + value, 
				tableName, fieldName));
	}
	
	public int create(String tableName, Object object) {
		try {
			Field[] fields = object.getClass().getDeclaredFields();
			Object[] values = new Object[fields.length];
			
			StringBuilder sql = new StringBuilder("INSERT INTO ")
					.append(tableName)
					.append(" (");
			
			for(int i = 0; i < fields.length; i++) {
				sql.append(fields[i].getName() + ", ");
				values[i] = fields[i].get(object);
			}
			
			sql.deleteCharAt(sql.length() - 2);
			sql.append(") VALUES (");
			
	        for (int i = 0; i < values.length; i++) {
	            if (values[i] instanceof String) {
	                sql.append("'").append(values[i]).append("', ");
	            } else {
	                sql.append(values[i]).append(", ");
	            }
	        }
	        
	        sql.setLength(sql.length() - 2);
	        sql.append(")");
			
			return queryService.rawUpdate(sql.toString());
		} catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public int deleteByField(String tableName, String fieldName, Object value) {
		return queryService.rawUpdate("DELETE FROM " + tableName + " WHERE " + fieldName + " = " + value);
	}
}
