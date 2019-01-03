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

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.io.File;

/**
 *
 * @Project demo
 * @Package cn.xy.framework.mvc.controller.response
 * @ClassName ResultAdvice
 * @Author Demo
 * @Date 2018年12月21日
 * @Version 1.0
 */

@ControllerAdvice
public class ResultAdvice  implements ResponseBodyAdvice{
    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        //return false;
        return true;
    }

    @Nullable
    @Override
    public Object beforeBodyWrite(@Nullable Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        if (o instanceof ErrorResult){
            HttpStatus httpStatus = (HttpStatus) ((ErrorResult) o).remove("HTTP_STATUS_CODE");
            serverHttpResponse.setStatusCode(httpStatus);
        }
        return o;
    }
}
