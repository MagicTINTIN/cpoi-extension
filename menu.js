// Create a unified API wrapper for compatibility


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
document.getElementById("testBtn1").addEventListener("click", () => {
    let k = prompt("Key");
    let v = prompt("Value");
    let kv = {}
    kv[k] = v
    set(kv);
    get(k)
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

document.getElementById("testBtn2").addEventListener("click", () => {
    let newValue = prompt("Key");
    get(`${newValue}`);
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