package com.duanjw.springframework.ioc.xml;

import com.duanjw.springframework.ioc.xml.dao.impl.AccountDaoImpl;
import com.duanjw.springframework.ioc.xml.dao.impl.ItemDaoImpl;
import com.duanjw.springframework.ioc.xml.service.PetStoreService;
import com.duanjw.springframework.ioc.xml.service.impl.PetStoreServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 通过读取XML实例化容器，并使用容器
 *
 * @author duanjw
 */
public class XmlApplication {
    public static void main(String[] args) {
        // 一、通过读取XML实例化容器

        // 1. spring.xml配置元数据文件中引入了services.xml和daos.xml，所以可以直接引入spring.xml
        // ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("xml/spring.xml");

        // 2. 也可以一次引入多个配置元数据文件
        ApplicationContext ctx = new ClassPathXmlApplicationContext("xml/services.xml", "xml/daos.xml");

        // 二、使用容器


        // 1. `ApplicationContext`是一个维护bean定义以及相互依赖的注册表的高级工厂的接口。通过使用方法`getBean()`，可以获取到bean的实例。
        PetStoreService bean = ctx.getBean(PetStoreServiceImpl.class);
//        PetStoreService bean = ctx.getBean("petStoreServiceImpl",PetStoreServiceImpl.class);
//        PetStoreService bean = (PetStoreServiceImpl)ctx.getBean("petStoreServiceImpl");

        //ctx.getBean(Class, Object...)
        //scope非原型，即使指定构造参数，获取到的对象还是之前初始化的的单例对象
//        PetStoreService bean = ctx.getBean(PetStoreServiceImpl.class, new AccountDaoImpl());
//        PetStoreService bean = (PetStoreServiceImpl)ctx.getBean("petStoreServiceImpl",new AccountDaoImpl());
        bean.show();


        System.out.println("\n-----原型bean和单例bean调用ctx.getBean(Class, Object...)效果-----");
        System.out.println("---1. 原型bean，每次调用都会返回一个bean，并且每次调用可以使用不同的构造方法---");
        ItemDaoImpl beanPrototypeArgs = ctx.getBean(ItemDaoImpl.class, "张三");
        ItemDaoImpl beanPrototype = ctx.getBean(ItemDaoImpl.class);
        ItemDaoImpl beanPrototype2 = ctx.getBean(ItemDaoImpl.class);

        System.out.println("\n---2. 单例bean，只会返回唯一一个bean，即使使用不同构造。因为该bean已经在上边初始化过所以一次都不会打印---");
        AccountDaoImpl beanSingletonArgs = ctx.getBean(AccountDaoImpl.class, "张三");
        AccountDaoImpl beanSingleton = ctx.getBean(AccountDaoImpl.class);



    }
}
