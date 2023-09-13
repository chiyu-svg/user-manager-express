1. **创建项目**
express UserManager --view=ejs

2. **配置node与数据库连接** 
    0. 启动 mongodb 数据库   mongod --dbpath UserManager/db
    1. 安装 mongoose 模块
    2.  创建 mongodb 数据库连接 /config

3. **创建 model 数据库映射模型** 
    /model
    在各个model 中对数据进行操作
4. **分别创建 services层 和 controllers 层**

5. **配置鉴权**
   jwt    /util （存session在数据库中，总归是有一些问题）
   token 不成文规定一般在 headers 中进行传输，key 值为 Authorization: "Bearer value"  在前面加上 "Bearer " 是一种习惯，至于为什么也不清楚  



6 **通过 apidoc 编写接口文档**
   
   
   
