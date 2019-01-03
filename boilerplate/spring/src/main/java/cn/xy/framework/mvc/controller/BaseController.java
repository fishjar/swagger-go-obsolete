/**
 * <html>
 * <body>
 *  <P> Copyright©2019 Demo. All rights reserved. </p>
 *  <p>  </p>
 *  <p> Created on 2018年5月22日</p>
 *  <p> Created by Demo</p>
 * </body>
 * </html> 
 */
package cn.xy.framework.mvc.controller;

import cn.xy.framework.mvc.entity.BaseEntity;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * controller基类
 * @Project demo-framework
 * @Package com.demo.framework.mvc.controller
 * @ClassName BaseController
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public abstract class BaseController<T extends BaseEntity> {

	/**
	 * <p>
	 * 获取项目在操作系统的绝对路径
	 * </p>
	 * 返回形如D:\工具\Tomcat-6.0\webapps\projectname\字符串 其中projectname为项目名称
	 * 
	 * @return
	 */
	protected String getRootAbsolutePath() {
		HttpServletRequest request = getRequest();
		String rootPath = request.getSession().getServletContext().getRealPath("/");
		return rootPath;
	}

	/**
	 * 得到应用的访问头地址 http://ip(域名):端口/应用名
	 *
	 * @return
	 */
	protected String getBasePath() {
		HttpServletRequest request = getRequest();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
		return basePath.concat(request.getContextPath());
	}

	/**
	 * 获取web上下文
	 * 
	 * @return
	 */
	protected ServletContext getServletContext() {
		HttpServletRequest request = getRequest();
		if (request != null) {
			return request.getSession().getServletContext();
		}
		return null;
	}

	/**
	 * 获取HttpServletRequest
	 * 
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return ( (ServletRequestAttributes) RequestContextHolder.getRequestAttributes() ).getRequest();
	}

	/**
	 * 获取HttpServletResponse
	 * 
	 * @return
	 */
	protected HttpServletResponse getResponse() {
		return ( (ServletRequestAttributes) RequestContextHolder.getRequestAttributes() ).getResponse();
	}

	/**
	 * 日期参数自动转换
	 * 
	 * @param request
	 * @param binder
	 * @throws Exception
	 */
	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
		// 1. 使用spring自带的CustomDateEditor
		// SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		// binder.registerCustomEditor(Date.class, new
		// CustomDateEditor(dateFormat, true));
		// 2. 自定义的PropertyEditorSupport
		binder.registerCustomEditor(Date.class, new DateConvertEditor());
		//binder.registerCustomEditor(String.class, new EmptyStringToNullConvertEditor());
	}

}
