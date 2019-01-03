package cn.xy.demo.foo.controller.v1;

import cn.xy.demo.DemoApplication;
import cn.xy.demo.foo.entity.Foo;
import cn.xy.framework.mvc.vo.IdListVO;
import cn.xy.framework.mvc.vo.IdVO;
import com.alibaba.fastjson.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;
import java.util.zip.DataFormatException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApplication.class)
@WebAppConfiguration
@ContextConfiguration
public class FooControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext wac;
    @Before

    public void setUp() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void find() throws Exception {
        RequestBuilder request = null;
        //request = get("/foos/275f9c947c3a46069b1cc711d4cff8b8");
        request = get("/foos/ere");
        mockMvc.perform(request).andDo(print()).andExpect(status().isOk());

    }

    @Test
    public void page() throws Exception {
        RequestBuilder request;
        request = get("/foos");
        mockMvc.perform(request).andDo(print()).andExpect(status().isOk());
    }

    @Test
    public void insert() throws Exception {
        RequestBuilder request =  null;
        Foo foo = new Foo();
        //foo.setName("foo3");
        foo.setAge(36);
        foo.setBirthDate(new Date());
        foo.setEmail("440@qq.com");
        //foo.setGoodTime(new Date());
        foo.setHomePage("/foo/index");
        Map<String, Object> extraAttr = new HashMap<>();
        extraAttr.put("honer", "huawei");
        foo.setMyExtra(extraAttr);
        List list = new ArrayList();
        list.add("gooooooooooood");
        foo.setMyExtraArray(list);
        String json = JSONObject.toJSONString(foo);
        request = post("/foos").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON).content(json);
        mockMvc.perform(request).andDo(print());
    }

    @Test
    public void delete0() throws Exception {
        RequestBuilder request =  null;
        //IdVO idVO = new IdVO();
        //idVO.setId("ed9789afe59e400ab5e918d69ddb07e3");
        //String json = JSONObject.toJSONString(idVO);
        request = delete("/foos/ed9789afe59e400ab5e918d69ddb07e3").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(request).andDo(print());
    }

    @Test
    public void delete1() throws Exception {
        RequestBuilder request =  null;
        IdListVO idListVO = new IdListVO();
        List<String> ids = new ArrayList<>();
        ids.add("275f9c947c3a46069b1cc711d4cff8b8");
        idListVO.setId(ids);
        String json = JSONObject.toJSONString(idListVO);
        request = delete("/foos").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON).content(json);
        mockMvc.perform(request).andDo(print());
    }

    @Test
    public void update() throws Exception {
        RequestBuilder request =  null;
        Foo foo = new Foo();
        foo.setName("foo5");
        foo.setAge(66);
        foo.setBirthDate(new Date());
        foo.setEmail("440@qq.com");
        foo.setGoodTime(new Date());
        foo.setHomePage("/foo/index");
        Map<String, Object> extraAttr = new HashMap<>();
        extraAttr.put("honer", "huawei");
        foo.setMyExtra(extraAttr);
        List list = new ArrayList();
        list.add("gooooooooooood");
        foo.setMyExtraArray(list);
        String json = JSONObject.toJSONString(foo);
        request = patch("/foos/f811dbe6886f4ffcbb").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON).content(json);
        mockMvc.perform(request).andDo(print());
    }

    @Test
    public void insertList() throws Exception {
        RequestBuilder request =  null;
        List<Foo> foos = new ArrayList<>();
        for (int i = 0; i < 2 ; i++){
            Foo foo = new Foo();
            foo.setName("foo"+(i+10));
            foo.setAge(66);
            foo.setBirthDate(new Date());
            foo.setEmail("440@qq.com");
            foo.setGoodTime(new Date());
            foo.setHomePage("/foo/index");
            Map<String, Object> extraAttr = new HashMap<>();
            extraAttr.put("honer", "huawei");
            foo.setMyExtra(extraAttr);
            List list = new ArrayList();
            list.add("gooooooooooood");
            foo.setMyExtraArray(list);
            foos.add(foo);
        }
        String json = JSONObject.toJSONString(foos);
        request = post("/foos/multiple").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON).content(json);
        mockMvc.perform(request).andDo(print());
    }

    @Test
    public void updateList() throws Exception {
        RequestBuilder request =  null;
        List<Foo> foos = new ArrayList<>();
        for (int i = 0; i < 2 ; i++){
            Foo foo = new Foo();
            foo.setName("foo"+(i+4));
            foo.setAge(66);
            foo.setBirthDate(new Date());
            foo.setEmail("440@qq.com");
            foo.setGoodTime(new Date());
            foo.setHomePage("/foo/index");
            Map<String, Object> extraAttr = new HashMap<>();
            extraAttr.put("honer", "huawei");
            foo.setMyExtra(extraAttr);
            List list = new ArrayList();
            list.add("gooooooooooood");
            foo.setMyExtraArray(list);
            foos.add(foo);
        }
        foos.get(0).setId("347233c369114e3a92f9044820f5d0d4");
        foos.get(1).setId("06f0b90c135d47d4ae0d798520f4d13a");
        String json = JSONObject.toJSONString(foos);
        request = patch("/foos").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON).content(json);
        mockMvc.perform(request).andDo(print());
    }

}