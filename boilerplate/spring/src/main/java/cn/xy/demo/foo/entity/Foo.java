/**
 * <html>
 * <p>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年12月21日</p>
 * <p> Created by Demo</p>
 * <p>
 * </body>
 * <p>
 * </html>
 */
package cn.xy.demo.foo.entity;


import cn.xy.framework.mvc.entity.BaseEntity;
import com.alibaba.fastjson.JSONObject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.xy.framework.common.validation.ValidationGroup;
import cn.xy.framework.common.validation.ValidationGroup.A;
import cn.xy.framework.common.validation.ValidationGroup.U;
import org.hibernate.validator.constraints.Range;

/**
 * 模板 Entity
 * @Project xy-demo
 * @Package cn.xy.demo.foo.entity
 * @ClassName Foo
 * @Author Demo
 * @Date 2018年12月21日
 * @Version 1.0
 */

public class Foo extends BaseEntity {

    private static final long serialVersionUID = 5742676071389785856L;
    /**
     *名字
     */
    @NotBlank(message = "名字不能为空", groups = {A.class, U.class})
    @Size(max = 64, message = "名字长度不能超过64个字符" , groups = {A.class, U.class})
    private String name;
    /**
     *年龄
     */
    private Integer age;
    /**
     *体重（kg）
     */
    private BigDecimal weight;
    /**
     *生日
     */
    private Date birthDate;
    /**
     *快乐时光
     */
    private Date goodTime;
    /**
     *电子邮件
     */
    @Size(max = 100, message = "电子邮件长度不能超过100个字符")
    private String email;
    /**
     *主页
     */
    @Size(max = 200, message = "主页长度不能超过200个字符")
    private String homePage;
    /**
     *备注
     */
    @Size(max = 1000, message = "备注长度不能超过1000个字符")
    private String notice;
    /**
     *是否安好 0/1=否/是
     */
    @NotNull(message = "必填", groups = {A.class, U.class})
    @Range(max = 1, message = "值不合法", groups = {A.class, U.class})
    private Integer isGood;
    /**
     *状态，1/2/3=正常/异常/禁用
     */
    @NotNull(message = "必填", groups = {A.class, U.class})
    @Range(min = 1, max = 2, message = "值不合法", groups = {A.class, U.class})
    private Integer status;
    /**
     *扩展字段
     */
    private transient String myExtraJson;
    /**
     *扩展列表
     */
    private transient String myExtraArrayJson;


    private Map<String, Object> myExtra;
    private List<Object> myExtraArray;

    /**
     * return the {@link Foo#name}
     */
    public String getName() {
        return this.name;
    }

    /**
     * @param name the {@link Foo#name} to set
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * return the {@link Foo#age}
     */
    public Integer getAge() {
        return this.age;
    }

    /**
     * @param age the {@link Foo#age} to set
     */
    public void setAge(Integer age) {
        this.age = age;
    }

    /**
     * return the {@link Foo#weight}
     */
    public BigDecimal getWeight() {
        return this.weight;
    }

    /**
     * @param weight the {@link Foo#weight} to set
     */
    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    /**
     * return the {@link Foo#birthDate}
     */
    public Date getBirthDate() {
        return this.birthDate;
    }

    /**
     * @param birthDate the {@link Foo#birthDate} to set
     */
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    /**
     * return the {@link Foo#goodTime}
     */
    public Date getGoodTime() {
        return this.goodTime;
    }

    /**
     * @param goodTime the {@link Foo#goodTime} to set
     */
    public void setGoodTime(Date goodTime) {
        this.goodTime = goodTime;
    }

    /**
     * return the {@link Foo#email}
     */
    public String getEmail() {
        return this.email;
    }

    /**
     * @param email the {@link Foo#email} to set
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * return the {@link Foo#homePage}
     */
    public String getHomePage() {
        return this.homePage;
    }

    /**
     * @param homePage the {@link Foo#homePage} to set
     */
    public void setHomePage(String homePage) {
        this.homePage = homePage == null ? null : homePage.trim();
    }

    /**
     * return the {@link Foo#notice}
     */
    public String getNotice() {
        return this.notice;
    }

    /**
     * @param notice the {@link Foo#notice} to set
     */
    public void setNotice(String notice) {
        this.notice = notice == null ? null : notice.trim();
    }

    /**
     * return the {@link Foo#isGood}
     */
    public Integer getIsGood() {
        return this.isGood;
    }

    /**
     * @param isGood the {@link Foo#isGood} to set
     */
    public void setIsGood(Integer isGood) {
        this.isGood = isGood;
    }

    /**
     * return the {@link Foo#status}
     */
    public Integer getStatus() {
        return this.status;
    }

    /**
     * @param status the {@link Foo#status} to set
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * return the {@link Foo#myExtraJson}
     */
    public String getMyExtraJson() {
        return this.myExtraJson;
    }

    /**
     * @param myExtraJson the {@link Foo#myExtraJson} to set
     */
    public void setMyExtraJson(String myExtraJson) {

        this.myExtraJson = myExtraJson == null ? null : myExtraJson.trim();
        this.myExtra = JSONObject.parseObject(this.myExtraJson);
    }

    /**
     * return the {@link Foo#myExtraArrayJson}
     */
    public String getMyExtraArrayJson() {
        return this.myExtraArrayJson;
    }

    /**
     * @param myExtraArrayJson the {@link Foo#myExtraArrayJson} to set
     */
    public void setMyExtraArrayJson(String myExtraArrayJson) {
        this.myExtraArrayJson = myExtraArrayJson == null ? null : myExtraArrayJson.trim();
        this.myExtraArray = JSONObject.parseArray(this.myExtraArrayJson);
    }

    public Map<String, Object> getMyExtra() {
        return myExtra;
    }

    public void setMyExtra(Map<String, Object> myExtra) {
        this.myExtra = myExtra;
        this.myExtraJson = JSONObject.toJSONString(myExtra);
    }

    public List<Object> getMyExtraArray() {
        return myExtraArray;
    }

    public void setMyExtraArray(List<Object> myExtraArray) {
        this.myExtraArray = myExtraArray;
        this.myExtraArrayJson = JSONObject.toJSONString(this.myExtraArray);
    }
}