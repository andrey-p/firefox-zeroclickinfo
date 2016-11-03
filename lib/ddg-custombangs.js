var ss = require("sdk/simple-storage"),
    pageMod = require("sdk/page-mod"),

    pagemod,
    installed = false;

exports.store = function (bangs) {
    ss.storage.customBangs = bangs;

    if (!installed) {
        exports.install();
    }
};

exports.install = function () {
    installed = true;

    pagemod = pageMod.PageMod({
        include: /^https?:\/\/(.*\.|)duckduckgo\.com($|\/.*$)/,
        contentScriptFile: './js/custombangs.js',
        attachTo: ["existing", "top"],
        onAttach: function(worker) {
            worker.port.emit('loadBangs', ss.storage.customBangs);
        }
    });
};
