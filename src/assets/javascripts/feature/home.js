class Home {
  constructor() {
    this.init();
  }

  async init() {
    await this.asyncHello();
    console.log('init done');
  }

  asyncHello() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('init Home Page...');
        resolve();
      }, 1000);
    });
  }
}

window.Home = Home;
export default Home;
