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

package cn.xy.demo.foo.controller.v1;

import cn.xy.framework.common.validation.ValidationGroup;
import cn.xy.framework.exception.BaseException;
import cn.xy.framework.mvc.controller.BaseController;
import cn.xy.framework.mvc.vo.IdListVO;
import cn.xy.framework.mvc.vo.Page;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.ImmutableMap;
import cn.xy.demo.foo.entity.Foo;
import cn.xy.demo.foo.service.FooService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

/**
* 模板 Controller
* @Project xy-demo
* @Package cn.xy.demo.foo.controller.v1
* @ClassName FooController
* @Author Demo
* @Date 2018年12月20日
* @Version 1.0
*/
@RestController
@RequestMapping(value = "/foos", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@Validated
public class FooController extends BaseController<Foo> {

	@Autowired
	private FooService fooService;

	/**
	 * 根据ID查询
	 *
	 * @param id ID
	 * @return
	 */
	@GetMapping("/{id}")
	public Foo find(@Size(min = 32, max = 32 ,message = "id不合法")@NotBlank(message = "id不能为空")@PathVariable(value = "id") String id) {
		return fooService.find(id);
	}


	/**
	* 分页查询
	*
	* @param page 分页查询参数
	* @return
	*/
	@GetMapping("")
	public PageInfo<Foo> page(Page page) {

		return fooService.findList(page);
	}

	/**
	* 新增
	*
	* @param foo 模板
	*/
	@PostMapping("")
	public Map<String,String> insert(@Validated({ ValidationGroup.A.class })@RequestBody Foo foo) {
		throw new BaseException(300, "ok");
		//return ImmutableMap.of("id",fooService.insert(foo));
	}

	/**
	* 根据ID删除
	*
	* @param id ID
	*/
	@DeleteMapping("/{id}")
	public void delete(@Size(min = 32, max = 32 ,message = "id不合法")@NotBlank(message = "id不能为空") @PathVariable(value = "id") String id) {
		fooService.delete(id);
	}

	/**
	* 根据ID集合删除
	*
	* @param ids ID集合
	*/
	@DeleteMapping("")
	public void delete(@RequestBody IdListVO ids) {
		fooService.delete(ids.getId());
	}

	/**
	* 更新
	*
	* @param foo 模板
	*/
	@PatchMapping("/{id}")
	public void update(@Size(min = 32, max = 32 ,message = "id不合法")@NotBlank(message = "id不能为空")@PathVariable(value = "id") String id, @Validated({ ValidationGroup.U.class })@RequestBody Foo foo) {
		foo.setId(id);
		fooService.update(foo);
	}

	/**
	 * 新增
	 *
	 * @param foo 模板
	 */
	@PostMapping("/multiple")
	public void insertList(@Validated({ ValidationGroup.A.class })@RequestBody List<Foo> foo) {
		fooService.batchInsert(foo);
	}

	/**
	 * 更新
	 *
	 * @param foo 模板
	 */
	@PatchMapping("")
	public void updateList(@Validated({ ValidationGroup.U.class })@RequestBody List<Foo> foo) {
		fooService.batchUpdate(foo);
	}

}