package cn.xy.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

/**
   *年龄
   */
@SpringBootApplication
@ComponentScan({ "cn.xy" })
@Import(
  value = {
    cn.xy.framework.mvc.controller.response.ResultAdvice.class,
    cn.xy.framework.mvc.controller.response.ExceptionHandlerAdvice.class
  }
)
@MapperScan({ "cn.xy.demo.sys.*.mapper", "cn.xy.demo.foo.mapper" })
public class DemoApplication {

  /**
     *年龄
     */
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

}

