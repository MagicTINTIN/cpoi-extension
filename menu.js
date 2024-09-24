// Create a unified API wrapper for compatibility
if (typeof browser === "undefined") {
    var thisBrowser = chrome;  // If browser is undefined, fall back to chrome
    var firefox = false;
} else {
    var thisBrowser = browser;
    var firefox = true;
}

function get(key) {
    if (typeof key == Array)
        return [];
    else if (typeof key == String)
        return "";
    else
        return console.log("The following type is not gettable:", key);
}

// browser.storage.sync.set({
//     theme: "dark",
// }, function () {
//     console.log("Settings saved");
// });

// thisBrowser.storage.sync.get(['theme'], function (result) {
//     console.log(result);
//     if (result === undefined) {
//         console.log("NO PREVIOUS DATA");
//         browser.storage.sync.set({
//             theme: "dark",
//         }, function () {
//             console.log("Settings saved");
//         });
//     }
// });

// browser.storage.sync.get(['theme'], function (result) {
//     console.log("Theme: " + result.theme);
// });

thisBrowser.storage.onChanged.addListener(function (changes, areaName) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in "${areaName}" changed. Old value: ${oldValue}, new value: ${newValue}`);
    }
});

document.getElementById("dataInput").focus();
document.getElementById("testBtn").addEventListener("click", () => {
    // let newValue;
    // thisBrowser.storage.sync.get(['theme'], function (result) {
    //     newValue = prompt("Theme: ", result.theme);
    //     thisBrowser.storage.sync.set({
    //         theme: newValue,
    //     }, function () {
    //         console.log("Settings saved");
    //     });
    // });
});