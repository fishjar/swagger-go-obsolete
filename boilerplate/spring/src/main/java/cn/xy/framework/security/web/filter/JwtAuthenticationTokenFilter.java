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
package cn.xy.framework.security.web.filter;

import cn.xy.framework.security.constant.SecurityConstant;
import cn.xy.framework.security.service.UserDemoService;
import cn.xy.framework.security.utils.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *
 * @Project xy-yun
 * @Package cn.xy.yun.common.web.security.web.filter
 * @ClassName JwtAuthenticationTokenFilter
 * @Author Demo
 * @Date 2018年10月23日
 * @Version 1.0
 */
@Slf4j
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UserDemoService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            String authorizationStr = httpServletRequest.getHeader(SecurityConstant.JWT_HEADER);
            if (StringUtils.isNotBlank(authorizationStr) && authorizationStr.startsWith(SecurityConstant.JWT_TOKENHEAD)) {
                final String tokenStr = authorizationStr.substring(SecurityConstant.JWT_TOKENHEAD_LEN);
                String username = JwtTokenUtil.getUsernameFromToken(tokenStr);
                log.info("tokenfilter:[token:{},username:{}]", tokenStr, username);
                if (StringUtils.isNotBlank(username)){
                    UserDetails authUser = this.userDetailsService.loadUserByUsername(username);
                    if (JwtTokenUtil.validateToken(tokenStr, authUser)) {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken( authUser, null, authUser.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails( httpServletRequest));
                        log.info("tokenfilter:[authenticated user:{}], setting security context", username);
                        SecurityContextHolder.getContext().setAuthentication(authentication); }
                }
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

}
