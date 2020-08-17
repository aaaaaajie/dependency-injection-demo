## 实例化容器
通过读取xml，实例化容器
```java
        // 通过读取XML实例化容器，并使用容器

        // 1. spring.xml配置元数据文件中引入了services.xml和daos.xml，所以可以直接引入spring.xml
        // ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("xml/spring.xml");

        // 2. 也可以一次引入多个配置元数据文件
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("xml/services.xml", "xml/daos.xml");
        PetStoreService bean = ctx.getBean(PetStoreServiceImpl.class);
        bean.show();
```
## 使用容器
```java
 PetStoreService bean = ctx.getBean(PetStoreServiceImpl.class);
```
### getBean的五个重载方法
#### getBean(Class)
获取指定Class的bean，并返回Class对象。
#### getBean(String,Class)
根据bean name获取指定Class的bean，并返回Class对象。
#### getBean(String)
根据bean name获取指定Class的bean，并返回Object对象。
#### getBean(String, Object...)
根据bean name获取指定Class的bean，并返回Object对象，第二个参数是构造方法的参数、工厂方法的参数。scope是原型使用此接口有效。
#### getBean(Class, Object...)
根据bean name获取指定Class的bean，并返回Class对象，第二个参数是构造方法的参数、工厂方法的参数。scope是原型使用此接口有效。