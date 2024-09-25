function urlEncode(input) {
    return input.split('').map(c => {
        if (/[a-zA-Z0-9\-_.~?]/.test(c)) {
            return c;
        } else if (c === ' ') {
            return '+';
        } else {
            return '%' + c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase();
        }
    }).join('');
}

function getCodeFromCPOI(mode, content, lang = 'en') {
    if (content == '' || mode == '') return "Input not filled";
    fetch(`https://cpoi.softplus.fr/?${lang}&${mode}=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => { return text.split("\n").join("").split(" ").join("") });
}

function getClipboardFromCPOI(code) {
    if (code == '') return "Code not filled";
    fetch(`https://cpoi.softplus.fr/?p=${code}`)
        .then(response => response.text())
        .then(text => { return text.slice(1) });
}


function getEasyFromCPOI(content, lang = 'en') {
    if (content == '') return "Input not filled";
    fetch(`https://cpoi.softplus.fr/?${lang}&e=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => { return text.split("\n").join("").split(" ").join("") });
}

document.getElementById("aButton").addEventListener("click", () => {document.getElementById("autoOutput").innerText = getEasyFromCPOI(document.getElementById("autoInput").innerText)});
document.getElementById("cButton").addEventListener("click", () => {document.getElementById("codeInput").innerText = getCodeFromCPOI('c', document.getElementById("dataInput").innerText)});
document.getElementById("pButton").addEventListener("click", () => {document.getElementById("dataInput").innerText = getClipboardFromCPOI(document.getElementById("codeInput").innerText)});


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