  CREATE TABLE `foo` (
   `id` varchar(32) NOT NULL COMMENT '主键',
   `name` varchar(64) DEFAULT NULL COMMENT '名字',
   `age` int(10) DEFAULT NULL COMMENT '年龄',
   `weight` decimal(5,2) DEFAULT NULL COMMENT '体重（kg）',
   `birth_date` date DEFAULT NULL COMMENT '生日',
   `good_time` datetime DEFAULT NULL COMMENT '快乐时光',
   `email` varchar(100) DEFAULT NULL COMMENT '电子邮件',
   `home_page` varchar(200) DEFAULT NULL COMMENT '主页',
   `notice` varchar(1000) DEFAULT NULL COMMENT '备注',
   `is_good` int(11) DEFAULT NULL COMMENT '是否安好 0/1=否/是',
   `status` int(10) DEFAULT NULL COMMENT '状态，1/2/3=正常/异常/禁用',
   `my_extra_json` text COMMENT '扩展字段',
   `my_extra_array_json` text COMMENT '扩展列表',
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模板'


 CREATE TABLE `user` (
   `id` varchar(32) NOT NULL COMMENT '主键',
   `name` varchar(64) DEFAULT NULL COMMENT '名字',
   `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
   `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
   `create_time` datetime DEFAULT NULL COMMENT '创建时间',
   PRIMARY KEY (`id`),
   UNIQUE KEY `UNIQUE_INDEX_EMAIL` (`email`),
   UNIQUE KEY `UNIQUE_INDEX_NAME` (`name`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号'