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
package cn.xy.framework.mvc.controller;

import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * 日期参数转换
 * @Project demo-framework
 * @Package com.demo.framework.mvc.controller
 * @ClassName DateConvertEditor
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public class DateConvertEditor extends PropertyEditorSupport {
    private SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public void setAsText(String text) throws IllegalArgumentException {
        if (StringUtils.hasText(text)) {
            try {
                if (text.indexOf(":") == -1 && text.length() == 10) {
                    setValue(this.dateFormat.parse(text));
                } else if (text.indexOf(":") > 0 && text.length() == 19) {
                    setValue(this.datetimeFormat.parse(text));
                } else if (text.indexOf(":") > 0 && text.length() == 21) {
                    text = text.replace(".0", "");
                    setValue(this.datetimeFormat.parse(text));
                } else {
                    throw new IllegalArgumentException("Could not parse date, date format is error ");
                }
            } catch (ParseException ex) {
                IllegalArgumentException iae = new IllegalArgumentException("Could not parse date: " + ex.getMessage());
                iae.initCause(ex);
                throw iae;
            }
        } else {
            setValue(null);
        }
    }
}
