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
package cn.xy.framework.mvc.service.impl;

import cn.xy.framework.exception.BaseException;
import cn.xy.framework.mvc.entity.BaseEntity;
import cn.xy.framework.mvc.mapper.BaseMapper;
import cn.xy.framework.mvc.service.BaseService;
import cn.xy.framework.mvc.vo.HttpStatus;
import cn.xy.framework.utils.PKGenerator;
import cn.xy.framework.mvc.vo.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;

/**
 * service 实现基类
 *
 * @Project demo-framework
 * @Package com.demo.framework.mvc.service.impl
 * @ClassName BaseServiceImpl
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
@Transactional(readOnly = true, noRollbackFor = Exception.class)
public abstract class BaseServiceImpl<T extends BaseEntity> implements BaseService<T> {
	/**
	 * 获得mapper
	 *
	 * @return
	 */
	protected abstract BaseMapper<T> getMapper();

	@Override
	public T find(String id) {
		T t = getMapper().findById(id);
		if (t == null) {
			throw new BaseException(HttpStatus.NOT_EXIST_DATA);
		}
		return t;
	}

	@Override
	public T find(Map<String, Object> paramsMap) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	public List<T> findList(List<String> ids) {
		List<T> list = getMapper().findListByIds(ids);
		if (CollectionUtils.isEmpty(list)) {
			throw new BaseException(HttpStatus.NOT_EXIST_DATA);
		}
		return list;
	}

	@Override
	public List<T> findList(Map<String, Object> paramsMap) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	public PageInfo<T> findList(Page page) {
		final PageInfo<T> pageInfo = PageHelper.startPage(page.getPageNum(), page.getPageSize()).setOrderBy(page.getSortOrder())
				.doSelectPageInfo(() -> getMapper().findListByPage(page.getParams(), null));
		if (CollectionUtils.isEmpty(pageInfo.getList())) {
			throw new BaseException(HttpStatus.NOT_EXIST_DATA);
		}
		return pageInfo;
	}

	@Override
	public List<T> findList() {
		List<T> list = getMapper().findAll();
		if (CollectionUtils.isEmpty(list)) {
			throw new BaseException(HttpStatus.NOT_EXIST_DATA);
		}
		return list;
	}

	@Override
	public long count() {
		return getMapper().count();
	}

	@Override
	public long count(Map<String, Object> paramsMap) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public String insert(T entity) {
		entity.setId(PKGenerator.generateId());
		getMapper().insert(entity);
		return entity.getId();
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void delete(String id) {
		getMapper().deleteById(id);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void delete(List<String> ids) {
		getMapper().deleteByIds(ids);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void delete(Map<String, Object> paramsMap) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void delete() {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void update(T entity) {
		getMapper().update(entity);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void update(Map<String, Object> paramsMap) {
		getMapper().updateByIds(paramsMap);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void batchDelete(List<String> ids) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void batchInsert(List<T> entitys) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void batchUpdate(List<T> entitys) {
		throw new BaseException(HttpStatus.NOT_IMPLEMENTED);
	}

}
