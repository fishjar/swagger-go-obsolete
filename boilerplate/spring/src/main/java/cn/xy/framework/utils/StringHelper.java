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
package cn.xy.framework.utils;


import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * UUID工具类
 *
 * @Project demo-framework
 * @Package com.demo.framework.utils
 * @ClassName StringHelper
 * @Author Demo
 * @Date 2018年5月22日
 * @Version 1.0
 */
public class StringHelper {

    public static final String BASE_STR_TEMPLATE = "abcdefghijklmnopqrstuvwxyz0123456789BCDEFGHIJKLMNOPQRSTUVWXY";

    public static final String DEFAULT_SEPARATOR = ",";

    /**
     * 将一个中间带逗号分隔符的字符串转换为ArrayList对象
     *
     * @param str 待转换的符串对象
     * @return ArrayList对象
     */
    public static List<String> strToArrayList(String str) {
        return strToArrayListManager(str, DEFAULT_SEPARATOR);
    }

    /**
     * 将字符串对象按给定的分隔符separator转象为ArrayList对象
     *
     * @param str       待转换的字符串对象
     * @param separator 字符型分隔符
     * @return ArrayList对象
     */
    public static List<String> strToArrayList(String str, String separator) {
        return strToArrayListManager(str, separator);
    }

    private static List<String> strToArrayListManager(String str, String separator) {

        StringTokenizer strTokens = new StringTokenizer(str, separator);
        ArrayList<String> list = new ArrayList<String>();

        while (strTokens.hasMoreTokens()) {
            list.add(strTokens.nextToken().trim());
        }
        return list;
    }


    /**
     * 获取随机字符串
     *
     * @param length
     * @param template
     * @return
     */
    public static String getRandomString(int length, String template) { //length表示生成字符串的长度
        Random random = new Random(System.currentTimeMillis());
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(template.length());
            sb.append(template.charAt(number));
        }
        return sb.toString();
    }

    /**
     * 获取随机字符串
     *
     * @param length
     * @return
     */
    public static String getRandomString(int length) {
        return getRandomString(length, BASE_STR_TEMPLATE);
    }

    /**
     * 字符链接
     * eg:join(",", [1,2,3,4].iterator())==>"1,2,3,4"
     *
     * @param splitor
     * @param iterator
     * @return
     */
    public static String join(String splitor, Iterator iterator) {
        StringBuilder sb = new StringBuilder();
        boolean isFirst = true;
        while (iterator.hasNext()) {
            if (isFirst) {
                isFirst = false;
            } else {
                sb.append(splitor);
            }
            sb.append(iterator.next());
        }
        return sb.toString();
    }

    /**
     * 字符链接
     * eg:join(",", [1,2,3,4])==>"1,2,3,4"
     *
     * @param splitor
     * @param it
     * @return
     */
    public static String join(String splitor, Iterable it) {
        Iterator itor = it.iterator();
        return join(splitor, itor);
    }

    public static String join(String splitor, String[] args) {
        Iterator itor = Arrays.asList(args).iterator();
        return join(splitor, itor);
    }

    public static String join(String... args) {
        if (args.length <= 1) {
            return null;
        }
        String spliter = args[0];
        int len = args.length;
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i < len; i++) {
            if (i != 1) {
                sb.append(spliter);
            }
            sb.append(args[i]);
        }
        return sb.toString();
    }

    /**
     * 下划线转驼峰法
     *
     * @param line       源字符串
     * @param smallCamel 大小驼峰,是否为小驼峰
     * @return 转换后的字符串
     */
    public static String underline2Camel(String line, boolean smallCamel) {
        if (line == null || "".equals(line)) {
            return "";
        }
        StringBuffer sb = new StringBuffer();
        final Pattern pattern = Pattern.compile("([A-Za-z\\d]+)(_)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(smallCamel && matcher.start() == 0 ? Character.toLowerCase(word.charAt(0))
                    : Character.toUpperCase(word.charAt(0)));
            int index = word.lastIndexOf('_');
            if (index > 0) {
                sb.append(word.substring(1, index).toLowerCase());
            } else {
                sb.append(word.substring(1).toLowerCase());
            }
        }
        return sb.toString();
    }

    /**
     * 驼峰法转下划线
     *
     * @param line 源字符串
     * @return 转换后的字符串
     */
    public static String camel2Underline(String line) {
        if (line == null || "".equals(line)) {
            return "";
        }
        line = String.valueOf(line.charAt(0)).toUpperCase().concat(line.substring(1));
        StringBuffer sb = new StringBuffer();
        final Pattern pattern = Pattern.compile("[A-Z]([a-z\\d]+)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(word.toLowerCase());
            sb.append(matcher.end() == line.length() ? "" : "_");
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println("ok");
    }

}
