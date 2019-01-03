/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年12月26日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.controller.response;

import cn.xy.framework.exception.BaseException;
import org.springframework.http.HttpStatus;

import javax.servlet.ServletException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @Project demo
 * @Package cn.xy.framework.mvc.controller.response
 * @ClassName ErrorResult
 * @Author Demo
 * @Date 2018年12月26日
 * @Version 1.0
 */
public class ErrorResult extends HashMap<String, Object> {
    public ErrorResult(HttpStatus httpStatus,  String errorMessage){
        put("HTTP_STATUS_CODE", httpStatus);
        put("message", errorMessage == null ? httpStatus.getReasonPhrase() : errorMessage);
    }

    public ErrorResult(BaseException be){
        put("HTTP_STATUS_CODE", HttpStatus.SERVICE_UNAVAILABLE);
        put("message", be.getMessage());
    }


    public void setErrors(List<Map<String, Object>> errors){
        assert containsKey("HTTP_STATUS_CODE");
        put("errors", errors);
    }

    public List<Map<String, Object>> append(String errorCode, String errorMessage){
        assert  containsKey("HTTP_STATUS_CODE");
        List<Map<String, Object>> errors = (List<Map<String, Object>>)get("errors");
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put("errorCode", errorCode);
        errorMap.put("errorMessage", errorMessage);
        errors.add(errorMap);
        return errors;
    }
}
