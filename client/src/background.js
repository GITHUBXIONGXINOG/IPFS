"use strict";

import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

let win;
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "./src/assets/logo.png",
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  // 取消菜单
  Menu.setApplicationMenu( null );

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", async () => {
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}