package com.duanjw.springframework.ioc.xml.dao.impl;

import com.huoshijie.springframework.ioc.xml.dao.ItemDao;

public class ItemDaoImpl implements ItemDao {
    private String name;
    /**
     * xml配置文件中没有指定构造方法，默认使用空参构造，
     *
     * @see xml/daos.xml
     */
    public ItemDaoImpl() {
        System.out.println("ItemDaoImpl空参构造初始化，hashCode：" + this.hashCode());
    }

    /**
     * cxt.getBean(ItemDaoImpl.class, "张三")，会调用此构造
     * 因为`ItemDaoImpl`是原型，如果`ItemDaoImpl`是单例则不会进入此构造
     *
     * @param name
     * @see xml/daos.xml
     */
    public ItemDaoImpl(String name) {
        this.name = name;
        System.out.println("ItemDaoImpl的String构造初始化，hashCode：" + this.hashCode());
    }
}
