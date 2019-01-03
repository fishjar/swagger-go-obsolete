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


import java.util.Date;

/**
 * 后台系统实体基类
 *
 * @Project demo-framework
 * @Package com.demo.framework.mvc.entity
 * @ClassName BaseSysEntity
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public class BaseSysEntity extends BaseEntity {

    private static final long serialVersionUID = 2336517858078854065L;
    /**
     * 创建人id
     */
    //@ApiModelProperty(value = "创建人id", hidden = true)
    protected String createrId;
    /**
     * 创建人名称
     */
    //@ApiModelProperty(value = "创建人名称", hidden = true)
    protected String createrName;
    /**
     * 创建时间
     */
    //@ApiModelProperty(value = "创建时间", hidden = true)
    protected Date createTime;
    /**
     * 修改人id
     */
    //@ApiModelProperty(value = "修改人id", hidden = true)
    protected String modifierId;
    /**
     * 修改人名称
     */
    //@ApiModelProperty(value = "修改人名称", hidden = true)
    protected String modifierName;
    /**
     * 修改时间
     */
    //@ApiModelProperty(value = "修改时间", hidden = true)
    protected Date modifyTime;

    public BaseSysEntity() {
        super();
    }

    /**
     * @return the createrId
     */
    public String getCreaterId() {
        return createrId;
    }

    /**
     * @param createrId the createrId to set
     */
    public void setCreaterId(String createrId) {
        this.createrId = createrId;
    }

    /**
     * return the {@link BaseSysEntity#createrName}
     */
    public String getCreaterName() {
        return createrName;
    }

    /**
     * @param createrName the {@link BaseSysEntity#createrName} to set
     */
    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }

    /**
     * @return the createTime
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime the createTime to set
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return the modifierId
     */
    public String getModifierId() {
        return modifierId;
    }

    /**
     * @param modifierId the modifierId to set
     */
    public void setModifierId(String modifierId) {
        this.modifierId = modifierId;
    }

    /**
     * return the {@link BaseSysEntity#modifierName}
     */
    public String getModifierName() {
        return modifierName;
    }

    /**
     * @param modifierName the {@link BaseSysEntity#modifierName} to set
     */
    public void setModifierName(String modifierName) {
        this.modifierName = modifierName;
    }

    /**
     * @return the modifyTime
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * @param modifyTime the modifyTime to set
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

}
