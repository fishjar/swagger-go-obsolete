/**
*<html>
*<body>
* <P> Copyright©2019 Demo. All rights reserved. </p>
* <p>  </p>
* <p> Created on 2018年12月20日</p>
* <p> Created by Demo</p>
*</body>
*</html>
*/
package cn.xy.demo.foo.service.impl;

import cn.xy.framework.mvc.mapper.BaseMapper;
import cn.xy.framework.mvc.service.impl.BaseServiceImpl;
import cn.xy.framework.utils.PKGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.xy.demo.foo.entity.Foo;
import cn.xy.demo.foo.mapper.FooMapper;
import cn.xy.demo.foo.service.FooService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
* 模板 ServiceImpl
* @Project xy-demo
* @Package cn.xy.demo.foo.service.impl
* @ClassName FooServiceImpl
* @Author Demo
* @Date 2018年12月20日
* @Version 1.0
*/
@Service
public class FooServiceImpl extends BaseServiceImpl<Foo> implements FooService {
	@Autowired
	private FooMapper fooMapper;

	@Override
	protected BaseMapper<Foo> getMapper() {
		return fooMapper;
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void batchInsert(List<Foo> foos){
		for (Foo foo: foos){
			foo.setId(PKGenerator.generateId());
		}
		fooMapper.batchInsert(foos);
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public void batchUpdate(List<Foo> foos){
		for (Foo foo: foos){
			update(foo);
		}
	}


}