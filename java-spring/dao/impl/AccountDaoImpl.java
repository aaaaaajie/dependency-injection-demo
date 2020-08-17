package com.duanjw.springframework.ioc.xml.dao.impl;

import com.duanjw.springframework.ioc.xml.dao.AccountDao;

/**
 *
 * @author duanjw
 */
public class AccountDaoImpl implements AccountDao {
    private String name;
    /**
     * xml配置文件中没有指定构造方法，默认使用空参构造，
     *
     * @see xml/daos.xml
     */
    public AccountDaoImpl(){
        System.out.println("AccountDaoImpl空参构造初始化，hashCode：" + this.hashCode());
    }

    /**
     * cxt.getBean(AccountDaoImpl.class, "张三")，不会调用此构造
     * 因为`AccountDaoImpl`是单例，如果`AccountDaoImpl`是原型则会进入此构造
     *
     * @param name
     * @see xml/daos.xml
     */
    public AccountDaoImpl(String name) {
        this.name = name;
        System.out.println("AccountDaoImpl的String构造初始化，hashCode：" + this.hashCode());
    }
    @Override
    public void show(){
        System.out.println("进入到：AccountDaoImpl.show()，name：" + name);
    }
}
