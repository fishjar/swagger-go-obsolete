/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年10月23日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.security.web.response;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/**
 *
 * @Project xy-yun
 * @Package cn.xy.yun.common.web.security.web.response
 * @ClassName JwtAuthenticationEntryPoint
 * @Author Demo
 * @Date 2018年10月23日
 * @Version 1.0
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    private static final long serialVersionUID = -7862184783478124778L;

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json; charset=utf-8");
        httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
        JSONObject result=new JSONObject();
        if(e instanceof BadCredentialsException) {
            /**身份认证未通过*/
            result.put("messsage","用户名或密码错误，请重新输入！");
        }else{
            result.put("messsage","无效的token");
            }
        httpServletResponse.getWriter().write(JSONObject.toJSONString(result));
    }
}
