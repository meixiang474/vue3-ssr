import express from "express";
import path from "path";
import App from "@/App";
import { createSSRApp } from "vue";
import createRouter from "@/router";
import createStore from "@/store";
import { renderToString } from "@vue/server-renderer";
import createServerRequest from "./request";

const app = express();

if (SSR) {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.static(path.join(__dirname, "..", "assets")));

  app.get("*", async (req, res) => {
    const app = createSSRApp(App);
    const router = createRouter();
    const request = createServerRequest(req);
    const store = createStore(request);
    app.use(router);
    app.use(store);
    router.push(req.url);
    await router.isReady();
    const matchedComponents = router
      .getRoutes()
      .map((route) => route.components.default);
    console.log(matchedComponents);
    const appContent = await renderToString(app);
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="referrer" content="no-referrer" /><!--hack 绕过别人的图片防盗链-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script>
          /** function setRemUnit() {
            let fontSize = window.innerWidth / 10;
            fontSize = fontSize > 50 ? 50 : fontSize;
            const html = document.querySelector('html');
            html.style.fontSize = fontSize + "px";
          }
          setRemUnit()
          window.addEventListener('resize', setRemUnit) */;
        </script>
      </head>
      <body>
        <div id="app">${appContent}</div>
        <script src="/index.js"></script>
        <script src="/vendors.js"></script>
      </body>
    </html>
    `);
  });
}

app.listen(3000, () => {
  console.log("Server is Running on 3000");
});
