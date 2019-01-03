/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年5月22日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.entity;

import java.io.Serializable;

/**
 * 实体基类
 *
 * @Project demo-framework
 * @Package com.demo.framework.mvc.entity
 * @ClassName BaseEntity
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 6998524653727232562L;
    /**
     * 主键ID
     */
    //@ApiModelProperty(value = "主键ID")
    protected String id;

    public BaseEntity() {
        super();
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

}
