# Android基础知识笔记

标签（空格分隔）： Android 基础

---

## Windows环境搭建

[Java相关下载](http://www.oracle.com/technetwork/java/javase/overview/index.html)
[Android开发相关工具下载](https://developer.android.google.cn/)
[genymotio个人免费版下载](https://www.genymotion.com/fun-zone/)
[测试](https:test.md)

### JDK安装与环境变量配置

JDK是Java Development Kit，也就是Java的开发工具包，其中包含了Java的编译、运行环境和其他一些工具。而Sun公司为Java提供了三种平台，JavaEE、`JavaSE`、JavaME。这三个平台的主要区别就在于基础类库的不同，也正是因为这些基础库的不同，导致他们的针对性不同。
Java EE是其中类库最多的，因此它主要针对服务器、Web应用等大型程序。
`Java SE`则包含最普遍的类库，所以他针对的是普通Java程序,选择这个平台进行安装。
Java ME则进行了进一步缩减，减少了整个环境的占用空间，针对的是性能不高的嵌入式环境。

***为什么要配置环境变量？***

环境变量是操作系统中一个具有特定名字的对象，它包含了一个或者多个应用程序所将使用到的信息，java配置环境变量是为了告诉操作系统java运行或编译时用到那些命令程序，或那些java相关的文件或类。

 > - PATH环境变量。作用是指定命令搜索路径，在shell下面执行命令时，它会到PATH变量所指定的路径中查找看是否能找到相应的命令程序。我们需要把jdk安装目录下的bin目录增加到现有的PATH变量中，bin目录中包含经常要用到的可执行文件如javac/java/javadoc等待，设置好PATH变量后，就可以在任何目录下执行javac/java等工具了。
> - CLASSPATH环境变量。作用是指定类搜索路径，要使用已经编写好的类，前提当然是能够找到它们了，JVM就是通过CLASSPTH来寻找类的。我们需要把jdk安装目录下的lib子目录中的dt.jar和tools.jar设置到CLASSPATH中，当然，当前目录“.”也必须加入到该变量中。（注意：JAVA1.5之后不用再设置classpath了，但强烈建议继续设置以保证向下兼容问题）
> - JAVA_HOME环境变量。它指向jdk的安装目录，是供Eclipse/Tomcat等软件就是通过搜索JAVA_HOME变量来找到并使用安装好的jdk。

系统变量→新建 `JAVA_HOME` 变量 。
变量值填写jdk的安装目录（如 C:\Program Files\Java\jdk版本号)

系统变量→寻找 `Path` 变量→编辑
在变量值最后输入 %JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
（注意：原来Path的变量值末尾有没有;号，如果没有，先输入;号再输入上面的代码，另外，jdk11之后不再生成jre文件夹，去掉<del>*%JAVA_HOME%\jre\bin*；</del>。）

系统变量→新建 `CLASSPATH` 变量
变量值填写.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar（注意最前面有一点）

### AndroidStudio安装与配置

和JAVA一样，为方便运行和编译时使用到命令程序，需要配置环境变量。

系统变量→新建 `ANDROID_HOME` 变量 。
变量值填写sdk目录（如 E:\Android\Sdk)

系统变量→寻找 `Path` 变量→编辑
在变量值最后输入 %ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

Android Studio安装好以后会在系统盘用户目录下产生这么几个文件

> - android 这个文件夹是Android SDK生成的AVD（Android Virtual DeviceManager）即模拟器存放路径。
> - AndroidStudio这个文件夹是AndroidStudio的配置文件夹，主要存放一些AndroidStudio设置和插件和项目的缓存信息。
> - gradle 这个文件夹是构建工具 Gradle的配置文件夹，也会存储一些项目的构建缓存信息。
> - m2 maven仓库下载的库文件保存在这里，你使用的所有的maven仓库都会先缓存到这里然后再添加到你的项目中进行使用；如果你用的插件越多这个文件夹将会持续增大

本来是用默认路径也没什么问题，不过在Windows环境下，什么东西都往系统盘里塞老是让人觉得不舒服，在一个这年头要个用个固态硬盘装系统，估计就剩不下多少地方了，因此把这些玩意儿扔到别处也是必要的。

***AVD虚拟设备存放位置***

使用AS的虚拟设备，则最好设置对应虚拟设备的存放位置，配置虚拟设备的目录（默认这个目录会在c盘，生成的目录是.android）

系统变量→新建 `ANDROID_SDK_HOME` 变量 。
变量值填写jdk的安装目录（如 E:\Android\WorkSpace\virtual_evice)

变量值使用的路径是自己定义的，这样在我们配置虚拟设备后，对应的配置文件就存储在E:\Android\WorkSpace\virtual_evice目录下。

***.AndroidStudio文件夹的修改***

进入Android Studio的安装目录，进入bin文件夹，用文本编辑软件打开idea.properties，去掉以下两项的注释符号#，修改对应的路径为新路径即可。

![81324099.jpg](https://i.loli.net/2019/11/01/pBsdGCRPOY4mVIi.png)

***.gradle文件夹的修改***

这个文件夹直接进入 AndroidStudio > File > Settings > Gradle修改目录（如E:/Android/WorkSpace/.gradle）

如果你使用这个方法也不行，可以[参考这里](https://blog.csdn.net/qiujuer/article/details/44257993)或者设置:
系统变量→新建`GRADLE_USER_HOME`环境变量
变量名：GRADLE_USER_HOME
变量值：E:\Android\WorkSpace\.gradle

***.m2文件夹的修改***
这个的配置也相对简单，直接进入 AndroidStudio > File > Settings > Path Variables
添加变量 `MAVEN_REPOSITORY` 
变量值：maven仓库缓存路径（如E:/Android/WorkSpace/.m2/repository）

###使用前准备

 1. 正式进行开发之前，先进行必要的更新比如SDK-Platforms、AndroidStudio、svn、git(git update-git-for-windows)、java版本等 。更新AndroidStudio版本后如果有需要改变.AndroidStudio文件夹路径需要重新设置。
 2. 各版本的Gradle下载。（gradle-4.5-all、gradle-3.3-all等）
 3. 导入设置文件（Set.jar）。
 4. 安装各种插件。Android ButterKnife Zelezny、GsonFormat、Android Parcelable code generator、Translation等等。
 5. 快捷键设置修改。

<font color="ff0000">选择设置Eclipse快捷键</font>

**默认快捷键：**
单行代码注释 Comment With Line Comment -> Ctrl + 斜杠
代码块注释 Comment With Block Comment -> Ctrl + Atl + 斜杠
转换大小写 Toggle Case -> Ctrl + Shift + Y或U
格式化代码 Reformat Code -> Ctrl + Alt + L 或 Ctrl + Shift + F
清除无用导包 Optimize Imports -> Ctrl + Alt + O 或 Ctrl + Shift + O
换行 Complete Current Statement -> Ctrl + Alt + Enter
重命名 Rename -> Alt + Shift + R

**修改快捷键：**
方法注释Fix doc Comment -> Alt + D
自动代码提示 Basic -> Alt + 斜杠
英文翻译 Translation -> Ctrl + Shift + X

 6. 版本控制Git安装
 7. 自动导包
 8. 编写注释模板。
修改文件生成模板 File -> seetings -> 找到 File and Code Templates
```
/**
* Auther: ShareHi
* Data: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
* Description: 
*/
```



## Android混淆打包加固
