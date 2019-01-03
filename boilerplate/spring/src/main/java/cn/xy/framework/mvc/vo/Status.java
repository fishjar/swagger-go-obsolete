/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年06月28日</p>
 * <p> Created by Demo</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.vo;

/**
 * <p>framework 服务状态</p>
 * <p>系统服务(sys):2000<br/>
 * 医小助服务(assistant):3000<br/>
 * 医护服务(medic):4000<br/>
 * 机构服务(institution):5000<br/>
 * 大众服务(general):6000<br/>
 * 支付服务(pay):7000<br/>
 * 搜索服务(search):8000<br/>
 * 作业服务(job):9000<p/>
 *
 * @Project msop
 * @Package com.demo.framework.mvc.vo
 * @ClassName Status
 * @Author Demo
 * @Date 2018年06月28日
 * @Version 1.0
 */
public interface Status {
    /**
     * 详细信息
     *
     * @return
     */
    public abstract String getMsg();

    /**
     * 服务代码
     *
     * @return
     */
    public abstract int getCode();
}