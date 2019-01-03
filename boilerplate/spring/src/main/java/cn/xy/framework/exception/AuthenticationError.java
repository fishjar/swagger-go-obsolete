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
package cn.xy.framework.exception;

import cn.xy.framework.mvc.vo.Status;

import javax.servlet.ServletException;

/**
 *
 * @Project demo
 * @Package cn.xy.framework.exception
 * @ClassName AuthenticationError
 * @Author Demo
 * @Date 2018年12月28日
 * @Version 1.0
 */
public class AuthenticationError  extends BaseException {
    private static final long serialVersionUID = -142987605986055648L;

    public AuthenticationError(Integer code, String message) {
        super(code, message);
    }
}
