import express from "express";
import path from "path";
import App from "@/App";
import { createSSRApp } from "vue";
import createRouter from "@/router";
import createStore from "@/store";
import { renderToString } from "@vue/server-renderer";
import createServerRequest from "./request";
import fs from "fs";
import { parallel } from "@/utils";
import proxy from "express-http-proxy";
import { HOST } from "@/api";

const app = express();

app.use(
  "/ssr/api",
  proxy(HOST, {
    proxyReqPathResolver: (req) => {
      return "/ssr/spi" + req.url;
    },
  })
);

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
    const matchedComponents: any[] = router.currentRoute.value.matched.map(
      (item) => {
        return item.components.default;
      }
    );
    const asyncDataPromises: Promise<any>[] = [];
    matchedComponents.forEach((item) => {
      if (item.asyncData) {
        const promise = new Promise((resolve) => {
          item
            .asyncData(store, router.currentRoute.value)
            .then(resolve, resolve);
        });
        asyncDataPromises.push(promise);
      }
    });
    await Promise.all(asyncDataPromises);
    const appContent = await renderToString(app);
    const cssFiles = (
      await fs.promises.readdir(path.join(__dirname, "../public"))
    ).filter((item) => path.extname(item) === ".css");
    cssFiles.sort((a) => {
      if (a === "vendors.css") {
        return -1;
      }
      if (a === "index.css") {
        return 1;
      }
      return 0;
    });
    const promises = cssFiles.map((file) => {
      const filepath = path.join(__dirname, "../public", file);
      return fs.promises.readFile(filepath, "utf-8");
    });
    const csses = await parallel(promises);

    const styles = csses.join("\r\n");
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="referrer" content="no-referrer" /><!--hack 绕过别人的图片防盗链-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>${styles}</style>
        <script>
          window.context = {
            state: ${JSON.stringify(store.state)}
          }
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
