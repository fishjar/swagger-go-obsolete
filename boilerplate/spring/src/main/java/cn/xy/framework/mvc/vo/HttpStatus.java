/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年06月01日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.vo;

/**
 * <p>demo-framework 响应状态</p>
 *
 * @Project demo-framework
 * @Package com.demo.framework.mvc
 * @ClassName HttpStatus
 * @Author Demo
 * @Date 2018年06月01日
 * @Version 1.0
 */
public enum HttpStatus implements Status {
    /**
     * 0:返回成功
     **/
    SUCCESS(0, "成功"),
    /**
     * -1:未知错误
     */
    UNKNOWN_ERROR(-1, "未知错误"),

    /**
     * 1000:不支持的mime类型
     **/
    NOT_SUPPORT_CONTENT_TYPE(1000, "不支持的mime类型"),
    /**
     * 1001:缺少参数
     */
    MISS_PARAM(1001, "缺少参数"),
    /**
     * 1002:不合法的参数
     */
    INVALID_PARAM(1002, "不合法的参数"),
    /**
     * 1003:非法请求,请提供签名
     */
    MISS_SIGN(1003, "非法请求,请提供签名"),
    /**
     * 1004:非法请求,签名无效
     */
    INVALID_SIGN(1004, "签名无效"),
    /**
     * 1005:用户不存在
     */
    NOT_EXIST_USER(1005, "用户不存在"),
    /**
     * 1006:用户名或密码错误
     */
    INVALID_USER_PASSWORD(1006, "用户名或密码错误"),
    /**
     * 1007:数据不存在
     */
    NOT_EXIST_DATA(1007, "数据不存在"),
    /**
     * 1008:文件不能为空
     */
    REQUIRED_FILE(1008, "文件不能为空"),
    /**
     * 1009:重复的数据
     */
    HAD_EXIST_DATA(1009, "重复的数据"),
    /**
     * 10010:存在多条数据
     */
    MORE_THAN_TWO_DATA(1010, "存在多条数据"),
    /**
     * 1011:不可输入纯数字
     */
    NOT_ALL_NUMERIC(1011, "不可输入纯数字"),
    /**
     * 1012:不可输入Emoji表情
     */
    NOT_HAS_EMOJI(1012, "不可输入Emoji表情"),
    /**
     * 1013:请输入内容
     */
    NOT_HAS_TEXT(1013, "请输入内容"),
    /**
     * 1014：正在处理中，请稍后.....
     */
    REPEAT_OPERATION(1014, "正在处理中，请稍后....."),
    /**
     * 1015: 接口不支持请求方式
     */
    NOT_SUPPORT_METHOD(1015, "请求方式不被支持"),
    /**
     * 1016: 不允许输入emoji表情或非法字符
     */
    NOT_SUPPORT_BRAW(1016, "不允许输入emoji表情或非法字符"),
    /**
     * 1017: 长度超过数据库字段允许的长度
     */
    OVER_COLUMN_LENGTH(1017, "长度超过数据库字段允许的长度"),
    /**
     * 501:
     */
    NOT_IMPLEMENTED(501, "没有实现"),;


    private int code;
    private String msg;

    HttpStatus(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    @Override
    public String getMsg() {
        return this.msg;
    }

    @Override
    public int getCode() {
        return code;
    }
}