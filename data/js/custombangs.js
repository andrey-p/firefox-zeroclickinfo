self.port.on("loadBangs", function (bangs) {
    window.postMessage({
        customBangs: JSON.stringify(bangs)
    }, "*");
});
