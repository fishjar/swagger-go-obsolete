package cn.xy.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@MapperScan({"cn.xy.demo.sys.*.mapper", "cn.xy.demo.foo.mapper"})
@ComponentScan({"cn.xy"})
@Import(value={cn.xy.framework.mvc.controller.response.ResultAdvice.class,
cn.xy.framework.mvc.controller.response.ExceptionHandlerAdvice.class})
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
