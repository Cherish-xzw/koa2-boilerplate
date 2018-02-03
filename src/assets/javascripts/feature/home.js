class Home {
  constructor() {
    this.init();
  }

  async init() {
    await this.asyncHello();
    console.log("init done");
  }

  asyncHello() {
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById("app").innerHTML = `
        <img src="/static/images/koa_logo.png" class="logo img-responsive"/>
        <i class="logo"></i>
        <h2>Welcome koajs-templates/ejs</h2>
        <a href="./about">Go to about</a>
        <h3>This template is generated by <a href="https://www.npmjs.com/package/koajs-cli">koajs-cli</a></h3>
        `
        resolve();
      }, 500);
    });
  }
}

export default Home;
