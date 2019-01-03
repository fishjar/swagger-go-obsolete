/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年12月21日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.controller.response;

import cn.xy.framework.exception.AuthenticationError;
import cn.xy.framework.exception.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.ServletException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @Project demo
 * @Package cn.xy.framework.mvc.controller.response
 * @ClassName ExceptionHandlerAdvice
 * @Author Demo
 * @Date 2018年12月21日
 * @Version 1.0
 */
@ControllerAdvice
public class ExceptionHandlerAdvice {
    @ExceptionHandler(value = BaseException.class)
    @ResponseBody
    public ErrorResult handleBaseException(BaseException e) {
        return new ErrorResult(e);
    }

    @ExceptionHandler(value = AuthenticationError.class)
    @ResponseBody
    public ErrorResult handleAuthenticationError(AuthenticationError e) {
        return new ErrorResult(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseBody
    public ErrorResult handleConstraintViolationException(ConstraintViolationException e) {
        ErrorResult errorResult = new ErrorResult(HttpStatus.BAD_REQUEST, "数据校验错误");
        errorResult.setErrors(createContrainViolationExceptionMsg(e));
        return errorResult;
    }

    @ExceptionHandler(value = ServletException.class)
    @ResponseBody
    public ErrorResult handleServletException(ServletException se) {
        if (se instanceof NoHandlerFoundException) {
            return new ErrorResult(HttpStatus.NOT_FOUND, se.getMessage());
        } else if (se instanceof HttpRequestMethodNotSupportedException) {
            return new ErrorResult(HttpStatus.METHOD_NOT_ALLOWED, se.getMessage());
        } else if (se instanceof HttpMediaTypeNotSupportedException) {
            return new ErrorResult(HttpStatus.UNSUPPORTED_MEDIA_TYPE, se.getMessage());
        } else if (se instanceof HttpMediaTypeNotAcceptableException) {
            return new ErrorResult(HttpStatus.METHOD_NOT_ALLOWED, se.getMessage());
        } else if (se instanceof MissingPathVariableException) {
            return new ErrorResult(HttpStatus.BAD_REQUEST, se.getMessage());
        } else if (se instanceof MissingServletRequestParameterException) {
            return new ErrorResult(HttpStatus.BAD_REQUEST, se.getMessage());
        } else if (se instanceof ServletRequestBindingException) {
            return new ErrorResult(HttpStatus.BAD_REQUEST, se.getMessage());
        } else  {
            return new ErrorResult(HttpStatus.BAD_REQUEST, se.getMessage());
        }

    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    public ErrorResult handleMethodArgumentNotValidException(MethodArgumentNotValidException me) {
        ErrorResult errorResult = new ErrorResult(HttpStatus.BAD_REQUEST, "数据校验错误");
        errorResult.setErrors(createMethodArgumentNotValidExceptionMsg(me));
        return errorResult;
    }

    private List<Map<String, Object>> createContrainViolationExceptionMsg(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        List<Map<String, Object>> errorsMap = constraintViolations.stream().map((cv) -> {
            Map<String, Object> error = new HashMap<>();
            if (cv != null) {
                String domain = "";
                Iterator<Path.Node> iterator = cv.getPropertyPath().iterator();
                while (iterator.hasNext()) {
                    Path.Node node = iterator.next();
                    domain = node.getName();
                }
                error.put("errorCode", domain);
                error.put("errorMessage", cv.getMessage());
            }
            return error;
        }).collect(Collectors.toList());
        return errorsMap;
    }

    private List<Map<String, Object>> createMethodArgumentNotValidExceptionMsg(MethodArgumentNotValidException me) {
        List<Map<String, Object>> errors = new ArrayList<>();
        for (FieldError error: me.getBindingResult().getFieldErrors()){
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("errorCode", error.getField());
            errorMap.put("errorMessage", error.getDefaultMessage());
            errors.add(errorMap);
        }
        return errors;
    }


}
