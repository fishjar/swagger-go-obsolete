const path = require('path');
const fs = require('fs-extra');
const prettier = require("prettier");

const { ROOT_PATH } = require('../config');

const outFile = path.join(ROOT_PATH, 'bin', 'test_java.java');
const outData = `
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
  @MapperScan({"cn.xy.demo.sys.*.mapper",        "cn.xy.demo.foo.mapper"})
  @ComponentScan({"cn.xy"})
  @Import(value={cn.xy.framework.mvc.controller.response.ResultAdvice.class,
  cn.xy.framework.mvc.controller.response.ExceptionHandlerAdvice.class})
  public class DemoApplication {
    /**
     *年龄
     */
    public static void main(String[] args) {
      SpringApplication.run(
        DemoApplication.class,         
        args);
    }
  }
`;



// fs.writeFileSync(outFile, outData, 'utf8');

fs.writeFileSync(outFile, prettier.format(outData, {
  parser: "java",
  // pluginSearchDirs: ["./dir-with-plugins"],
  // plugins: ["prettier-plugin-java"]
}), 'utf8');
