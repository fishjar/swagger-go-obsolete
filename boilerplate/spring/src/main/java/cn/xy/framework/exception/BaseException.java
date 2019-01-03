/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年5月30日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.exception;

import cn.xy.framework.mvc.vo.Status;
import lombok.Data;
import lombok.NonNull;


/**
 * 自定义业务异常
 *
 * @Project demo-framework
 * @Package com.demo.framework.exception
 * @ClassName BaseException
 * @Author Demo
 * @Date 2018年5月30日
 * @Version 1.0
 */
@Data
public class BaseException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    /**
     * 状态码
     **/
    private Integer code;


    public BaseException(Status status) {
        super(status.getMsg());
        this.code = status.getCode();

    }

    public BaseException(@NonNull Integer code, @NonNull String message) {
        super(message);
        this.code = code;
    }

}
