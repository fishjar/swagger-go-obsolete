/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年10月26日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.security.controller;

import cn.xy.framework.security.constant.SecurityConstant;
import cn.xy.framework.exception.AuthenticationError;
import cn.xy.framework.security.model.UserDemo;
import cn.xy.framework.security.utils.JwtTokenUtil;

import cn.xy.framework.security.vo.LoginForm;
import cn.xy.framework.security.vo.LoginResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

/**
 *
 * @Project xy-yun
 * @Package cn.xy.yun.web.user.controller.v1
 * @ClassName AuthController
 * @Author Demo
 * @Date 2018年10月26日
 * @Version 1.0
 */

@RestController
@RequestMapping("/account")
public class AuthController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginForm loginForm){
        if (Objects.equals("123456", loginForm.getPassword())){
            LoginResponse ls = new LoginResponse();
            ls.setStatus("1");
            ls.setType(loginForm.getType());
            ls.setCurrentAuthority("");
            ls.setAuthtoken(JwtTokenUtil.generateToken(new UserDemo(loginForm.getUserName())));
            return ls;
        }
        throw new AuthenticationError(HttpStatus.UNAUTHORIZED.value(), "认证失败");
    }

    @PostMapping("/reflesh")
    public LoginResponse reflesh(@RequestHeader(value= SecurityConstant.JWT_HEADER) String tokenValue){

        if (StringUtils.isNotBlank(tokenValue)){
            String token = tokenValue.substring(SecurityConstant.JWT_TOKENHEAD_LEN);
            if (!JwtTokenUtil.isTokenExpired(token)){
                LoginResponse ls = new LoginResponse();
                ls.setAuthtoken(JwtTokenUtil.refreshToken(token));
                return  ls;
            }else {
                throw new AuthenticationError(HttpStatus.UNAUTHORIZED.value(), "token已过期");
            }
        }
        throw new AuthenticationError(HttpStatus.UNAUTHORIZED.value(), "认证失败");

    }

}
