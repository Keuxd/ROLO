package com.rolo.ROLO.controller.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;


@RestController
@RequestMapping("/api")
public class AuthEndpoints {

	@Autowired
	private RequestMappingHandlerMapping handlerMapping;
	
	
    @GetMapping("/endpoints")
    public List<Map<String, Object>> listEndpoints() {
        Map<String, Map<String, List<String>>> groupedEndpoints = handlerMapping.getHandlerMethods().entrySet().stream()
            .filter(entry -> entry.getValue().getBeanType().isAnnotationPresent(RestController.class))
            .filter(entry -> entry.getValue().getBeanType().getPackageName().startsWith("com.rolo"))
            .collect(Collectors.groupingBy(
                entry -> classifyEndpoint(entry.getKey().toString()),
                Collectors.groupingBy(
                    entry -> entry.getValue().getBeanType().getSimpleName(),
                    Collectors.mapping(entry -> entry.getKey().toString(), Collectors.toList())
                )
            ));
        
        List<Map<String, Object>> response = new ArrayList<>();

        groupedEndpoints.forEach((type, endpointsMap) -> {
            Map<String, Object> typeEntry = Map.of("type", type, "endpoints", endpointsMap.entrySet().stream()
                .map(entry -> Map.of("classType", entry.getKey(), "endpoints", entry.getValue()))
                .collect(Collectors.toList()));
            response.add(typeEntry);
        });

        return response;
    }
    
    private String classifyEndpoint(String endpoint) {
        if (endpoint.contains("db")) {
            return "DB Endpoints";
        } else if (endpoint.contains("api")) {
            return "API Endpoints";
        } else {
            return "Extra Endpoints";
        }
    }
}
