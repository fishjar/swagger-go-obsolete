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
package cn.xy.framework.utils;

import java.util.UUID;

/**
 * UUID工具类
 * @Project demo-framework
 * @Package com.demo.framework.utils
 * @ClassName PKGenerator
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public class PKGenerator {
    /**
     * 生成数据库主键ID值
     *
     * @return
     */
    public static String generateId() {
        String s = UUID.randomUUID().toString();
        return s.replaceAll("-", "");
    }
}
