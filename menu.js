let instance = "https://cpoi.softplus.fr/"

function urlEncode(input) {
    return input.split('').map(c => {
        if (/[a-zA-Z0-9\-_.~?]/.test(c)) {
            return c;
        } else {
            return '%' + encodeURIComponent(c).slice(1).toUpperCase();
        }
    }).join('');
}

function updateAndClipboardCopy(obj, value) {
    console.log(value);
    obj.innerHTML = value;
    navigator.clipboard.writeText(value);
}

function getCodeFromCPOI(ret, mode, content, lang = 'en') {
    if (content == '' || mode == '') return "Input not filled";
    fetch(`${instance}?${lang}&${mode}=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}

function getClipboardFromCPOI(ret, code) {
    if (code == '') return "Code not filled";
    fetch(`${instance}?p=${code}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}


function getEasyFromCPOI(ret, content, lang = 'en') {
    if (content == '') return "Input not filled";
    fetch(`${instance}?${lang}&e=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}

document.getElementById("aButton").addEventListener("click", () => { getEasyFromCPOI(document.getElementById("autoOutput"), document.getElementById("autoInput").value) });
document.getElementById("cButton").addEventListener("click", () => { getCodeFromCPOI(document.getElementById("codeInput"), 'c', document.getElementById("dataInput").value) });
document.getElementById("pButton").addEventListener("click", () => { getClipboardFromCPOI(document.getElementById("dataInput"), document.getElementById("codeInput").value) });


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