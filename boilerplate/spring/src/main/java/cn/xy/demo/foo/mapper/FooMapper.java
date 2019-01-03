/**
* <html>
* <body>
*  <P> Copyright©2019 Demo. All rights reserved. </p>
*  <p>  </p>
*  <p> Created on 2018年12月20日</p>
*  <p> Created by Demo</p>
* </body>
* </html>
*/
package cn.xy.demo.foo.mapper;

import cn.xy.demo.foo.entity.Foo;
import cn.xy.framework.mvc.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* 模板 Mapper
* @Project xy-demo
* @Package cn.xy.demo.foo.mapper
* @ClassName FooMapper
* @Author Demo
* @Date 2018年12月20日
* @Version 1.0
*/
@Mapper
public interface FooMapper extends BaseMapper<Foo> {
}