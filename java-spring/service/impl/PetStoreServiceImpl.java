package com.duanjw.springframework.ioc.xml.service.impl;

import com.duanjw.springframework.ioc.xml.dao.AccountDao;
import com.duanjw.springframework.ioc.xml.dao.ItemDao;
import com.duanjw.springframework.ioc.xml.service.PetStoreService;

/**
 * 宠物商城
 *
 * @author duanjw
 */
public class PetStoreServiceImpl implements PetStoreService {

    /**
     * xml配置文件中没有指定构造方法，默认使用空参构造，
     *
     * @see xml/services.xml
     */
    public PetStoreServiceImpl() {
        System.out.println("PetStoreServiceImpl空参构造初始化，hashCode：" + this.hashCode());
    }

    /**
     * cxt.getBean(PetStoreServiceImpl.class, new AccountDaoImpl())，不会调用此构造
     * 因为`PetStoreServiceImpl`是单例，如果`PetStoreServiceImpl`是原型则会进入此构造
     *
     * @param accountDao
     * @see xml/services.xml
     */
    public PetStoreServiceImpl(AccountDao accountDao) {
        this.accountDao = accountDao;
        System.out.println("PetStoreServiceImpl的accountDao构造初始化，hashCode：" + this.hashCode());

    }

    /**
     * 在xml中配置注入`accountDaoImpl`
     * 通过该属性的setter方法注入，所以必须有setter方法
     *
     * @see xml/services.xml
     */
    private AccountDao accountDao;

    /**
     * 在xml中配置注入`itemDaoImpl`
     * 通过该属性的setter方法注入，所以必须有setter方法
     *
     * @see xml/services.xml
     */
    private ItemDao itemDao;

    @Override
    public void show() {
        accountDao.show();
    }


    public ItemDao getItemDao() {
        return itemDao;
    }

    public void setItemDao(ItemDao itemDao) {
        this.itemDao = itemDao;
    }

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }
}
