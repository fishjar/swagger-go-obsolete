/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年10月24日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.security.constant;

/**
 *
 * @Project xy-yun
 * @Package cn.xy.yun.common.constant
 * @ClassName SecurityConstant
 * @Author Demo
 * @Date 2018年10月24日
 * @Version 1.0
 */
public final  class SecurityConstant {
    public final static String JWT_HEADER = "authtoken";
    public final static String JWT_SECRET = "mySecret";
    public final static int JWT_EXPIRATION = 30 * 60;
    public final static String JWT_TOKENHEAD = "";
    public final static int JWT_TOKENHEAD_LEN = JWT_TOKENHEAD.length();
    public final static String JWT_ROUTE_AUTHENTICATION_PATH = "/auth/login";
    public final static String JWT_ROUTE_AUTHENTICATION_REFRESH = "/auth/reflesh";
    public final static String JWT_ROUTE_AUTHENTICATION_register = "/auth/register";
    public final static String CLAIM_KEY_SUB = "sub";
    public final static String CLAIM_KEY_CREATED = "iat";
}
