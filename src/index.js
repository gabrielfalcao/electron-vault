const { app, Tray, Menu, nativeImage, BrowserWindow } = require("electron");
const path = require("path");
let tray;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(path.resolve(__dirname, "tray.png"));

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Window",
      type: "normal",
      click(menuItem, browserWindow, event) {
        createWindow();
      },
    },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
