/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年10月25日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.security.service;
import cn.xy.framework.security.model.UserDemo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 *
 * @Project xy-yun
 * @Package cn.xy.yun.common.web.security.service
 * @ClassName UserDemoService
 * @Author Demo
 * @Date 2018年10月25日
 * @Version 1.0
 */

@Component
public class UserDemoService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return new UserDemo(s);
    }
}
