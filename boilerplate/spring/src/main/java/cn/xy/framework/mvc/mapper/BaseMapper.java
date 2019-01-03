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
package cn.xy.framework.mvc.mapper;

import cn.xy.framework.mvc.entity.BaseEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * mapper基类
 * @Project demo-framework
 * @Package com.demo.framework.mvc.mapping
 * @ClassName BaseMapper
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public interface BaseMapper<T extends BaseEntity> {
    /**
     * 根据Id查询
     *
     * @param id
     * @return
     */
    T findById(String id);

    /**
     * 根据参数查询
     *
     * @param paramsMap
     * @return
     */
    T findByParams(@Param("paramsMap") Map<String, Object> paramsMap);

    /**
     * 根据ID集合来查询
     *
     * @param ids
     * @return
     */
    List<T> findListByIds(List<String> ids);

    /**
     * 根据参数查询列表
     *
     * @param paramsMap
     * @return
     */
    List<T> findListByParams(@Param("paramsMap") Map<String, Object> paramsMap);

    /**
     * 分页查询
     *
     * @param params
     * @param sortOrder
     * @return
     */
    List<T> findListByPage(@Param("paramsMap") Map<String, Object> params, @Param("sortOrder") String sortOrder);

    /**
     * 查询所有记录
     *
     * @return
     */
    List<T> findAll();

    /**
     * 查询总记录数
     *
     * @return
     */
    long count();

    /**
     * 根据参数查询总记录数
     *
     * @param paramsMap
     * @return
     */
    long countByParams(@Param("paramsMap") Map<String, Object> paramsMap);

    /**
     * 添加
     *
     * @param entity
     */
    void insert(T entity);

    /**
     * 根据Id删除
     *
     * @param id
     */
    void deleteById(String id);

    /**
     * 根据ID集合删除
     *
     * @param ids
     */
    void deleteByIds(List<String> ids);

    /**
     * 根据参数删除
     *
     * @param paramsMap
     */
    void deleteByParams(@Param("paramsMap") Map<String, Object> paramsMap);

    /**
     * 删除所有记录
     */
    void deleteAll();

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
    void updateByIds(Map<String, Object> paramsMap);

    /**
     * 批量删除
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
