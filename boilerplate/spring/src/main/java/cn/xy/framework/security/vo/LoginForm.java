/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年12月28日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.security.vo;

/**
 *
 * @Project demo
 * @Package cn.xy.framework.security.vo
 * @ClassName LoginForm
 * @Author Demo
 * @Date 2018年12月28日
 * @Version 1.0
 */
public class LoginForm {
    private String userName;
    private String password;
    private String type;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
