# vueDemo-mt
这是基于Vue框架仿移动端美团的练习

> 写在前面：这是一个Vue框架下的web移动端的仿美团项目，里面有大部分的功能

####	 1.出现了 但是没有解决的问题记录(不影响功能实现)

goods组件中控制台报错：

~~~js
[Vue warn]: Error in render: "TypeError: this.goods.forEach is not a function"

found in

---> <Goods> at src/components/goods/Goods.vue
       <App> at src/App.vue
         <Root>


TypeError: this.goods.forEach is not a function
~~~

回头找下 解决掉.....

####	 2.值得记录的一个调试工具

weinre[思否网页地址](https://segmentfault.com/a/1190000010017457)

weinre[貌似是官网(要到墙外)](https://people.apache.org/~pmuellr/weinre/docs/latest/)

记录运用简单的运用方式：

~~~nodejs
全局安装：
Mac：sudo npm install -g weinre
windows：npm install -g weinre

启动：
weinre --boundHost 当前IP地址
weinre --boundHost 192.168.XX.XX
~~~

下面的请移步CSDN地址的[weinre链接](https://blog.csdn.net/Mr_pets/article/details/102939534)

####	 3. GitHub上下载的压缩包的使用

- 将文件包下载下来 =>解压到你想解压的地方
- 终端（terminal）或者cmd(或者powershell)进入文件夹这里的应该是mt-app这个文件名
- 运行 npm install 安装好依赖
- 运行 npm run serve应该就可以在浏览器看到了

----恩 不出意外应该没有了(end)----

