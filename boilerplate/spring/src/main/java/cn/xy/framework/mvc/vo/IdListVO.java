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
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;
import java.util.List;

/**
 * 用于批量删除的主键ID集合对象
 *
 * @Project msop
 * @Package com.demo.msop.general.vo
 * @ClassName IdListVO
 * @Author Demo
 * @Date 2018年07月09日
 * @Version 1.0
 */
@Data
@Accessors(chain = true)
public class IdListVO implements Serializable {

    private static final long serialVersionUID = 8695204113076444590L;
    @NotEmpty(message = "主键ID集合必填")
    private List<String> id;
}
