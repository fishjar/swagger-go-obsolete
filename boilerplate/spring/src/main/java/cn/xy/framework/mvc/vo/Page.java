/**
 * <html>
 * <body>
 * <P> Copyright©2019 Demo. All rights reserved. </p>
 * <p>  </p>
 * <p> Created on 2018年6月8日</p>
 * <p> Created by benson</p>
 * </body>
 * </html>
 */
package cn.xy.framework.mvc.vo;


import cn.xy.framework.utils.StringHelper;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 分页查询参数
 * @Project demo-framework
 * @Package com.demo.framework.mvc.vo
 * @ClassName Page
 * @Author benson
 * @Date 2018年6月8日
 * @Version 1.0
 */

public class Page {


    private final String[] sortSymbol = new String[]{" DESC", " ASC"};

    private final String sortSeparator = ",";

    /**
     * 页码，从1开始
     */

    private Integer pageNum = 1;
    /**
     * 每页的数量,默认10
     */
    private Integer pageSize = 10;
    /**
     * 过滤参数
     */
    private Map<String, Object> params = new HashMap<>();
    /**
     * 排序
     */
    private Map<String, Integer> sort = new LinkedHashMap<>();

    public Page() {
    }

    /**
     * return the {@link Page#pageNum}
     */
    public Integer getPageNum() {
        return pageNum;
    }

    /**
     * @param pageNum the {@link Page#pageNum} to set
     */
    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    /**
     * return the {@link Page#pageSize}
     */
    public Integer getPageSize() {
        return pageSize;
    }

    /**
     * @param pageSize the {@link Page#pageSize} to set
     */
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    /**
     * return the {@link Page#params}
     */
    public Map<String, Object> getParams() {
        return params;
    }

    /**
     * @param params the {@link Page#params} to set
     */
    public void setParams(Map<String, Object> params) {
        this.params = params;
    }

    /**
     * return the {@link Page#sort}
     */
    public Map<String, Integer> getSort() {
        return sort;
    }

    /**
     * @param sort the {@link Page#sort} to set
     */
    public void setSort(Map<String, Integer> sort) {
        this.sort = sort;
    }

    /**
     * 获取排序的字符串
     * @return
     */
    public String getSortOrder(){
        if(sort == null){
            return null;
        }
        StringBuilder stringBuilder = new StringBuilder();
        sort.entrySet().forEach(e -> stringBuilder.append(StringHelper.camel2Underline(e.getKey())).append(sortSymbol[e.getValue()]).append(sortSeparator));
        if(stringBuilder.length()>0){
            stringBuilder.deleteCharAt(stringBuilder.length()-1);
        }
        return stringBuilder.toString();
    }
}
