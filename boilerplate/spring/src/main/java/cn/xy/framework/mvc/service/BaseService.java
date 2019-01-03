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
package cn.xy.framework.mvc.service;

import cn.xy.framework.mvc.entity.BaseEntity;
import cn.xy.framework.mvc.vo.Page;
import com.github.pagehelper.PageInfo;


import java.util.List;
import java.util.Map;

/**
 * service基类
 * @Project demo-framework
 * @Package com.demo.framework.mvc.service
 * @ClassName BaseService
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public interface BaseService<T extends BaseEntity> {
	/**
	 * 通过Id查询
	 * 
	 * @param id
	 * @return
	 */
	T find(String id);

	/**
	 * 根据参数查询
	 *
	 * @param paramsMap
	 * @return
	 */
	T find(Map<String, Object> paramsMap);

	/**
	 * 根据ID集合来查询
	 * 
	 * @param ids
	 * @return
	 */
	List<T> findList(List<String> ids);

	/**
	 * 查询列表
	 *
	 * @param paramsMap
	 * @return
	 */
	List<T> findList(Map<String, Object> paramsMap);

	/**
	 * 分页查询
	 * 
	 * @param page
	 * @return
	 */
	PageInfo<T> findList(Page page);

	/**
	 * 查询所有记录
	 * 
	 * @return
	 */
	List<T> findList();

	/**
	 * 查询总记录数
	 *
	 * @param paramsMap
	 * @return
	 */
	long count(Map<String, Object> paramsMap);

	/**
	 * 查询总记录数
	 * 
	 * @return
	 */
	long count();

	/**
	 * 添加
	 * 
	 * @param entity
	 */
	String insert(T entity);

	/**
	 * 根据Id删除
	 * 
	 * @param id
	 */
	void delete(String id);

	/**
	 * 根据ID集合删除
	 * 
	 * @param ids
	 */
	void delete(List<String> ids);

	/**
	 * 根据参数删除
	 *
	 * @param paramsMap
	 */
	void delete(Map<String, Object> paramsMap);

	/**
	 * 删除所有记录
	 */
	void delete();

	/**
	 * 更新
	 * 
	 * @param entity
	 */
	void update(T entity);

	/**
	 * 根据ID集合更新
	 * @param paramsMap
	 */
	void update(Map<String, Object> paramsMap);

	/**
	 * 根据ID集合批量删除
	 *
	 * @param ids
	 */
	void batchDelete(List<String> ids);

	/**
	 * 批量插入
	 *
	 * @param entitys
	 */
	void batchInsert(List<T> entitys);

	/**
	 * 批量更新
	 *
	 * @param entitys
	 */
	void batchUpdate(List<T> entitys);
}
