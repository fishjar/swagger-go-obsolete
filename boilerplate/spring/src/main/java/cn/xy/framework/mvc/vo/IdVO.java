/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年07月09日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.vo;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;

/**
 * 用于删除操作的主键ID对象
 *
 * @Project msop
 * @Package com.demo.msop.general.vo
 * @ClassName IdVO
 * @Author Demo
 * @Date 2018年07月09日
 * @Version 1.0
 */
@Data
public class IdVO implements Serializable {

    private static final long serialVersionUID = 9071807282341832556L;


    @NotBlank(message = "ID必填")
    private String id;

    public IdVO(String id) {
        this.id = id;
    }

    public IdVO() {
    }
}
