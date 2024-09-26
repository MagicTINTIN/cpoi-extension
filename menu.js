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
    fetch(`${localSettings.instance}?${lang}&${mode}=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}

function getClipboardFromCPOI(ret, code) {
    if (code == '') return "Code not filled";
    fetch(`${localSettings.instance}?p=${code}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}


function getEasyFromCPOI(ret, content, lang = 'en') {
    if (content == '') return "Input not filled";
    fetch(`${localSettings.instance}?${lang}&e=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}

document.getElementById("aButton").addEventListener("click", () => {
    getEasyFromCPOI(document.getElementById("autoOutput"), document.getElementById("autoInput").value);
    if (content == '') return;
    document.getElementById("autoOutput").style.transform = "scale(1)";
});
document.getElementById("cButton").addEventListener("click", () => { getCodeFromCPOI(document.getElementById("codeInput"), 'c', document.getElementById("dataInput").value) });
document.getElementById("pButton").addEventListener("click", () => { getClipboardFromCPOI(document.getElementById("dataInput"), document.getElementById("codeInput").value) });


thisBrowser.storage.onChanged.addListener(function (changes, areaName) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in "${areaName}" changed. Old value: ${oldValue}, new value: ${newValue}`);
    }
});

document.getElementById("dataInput").focus();

// document.getElementById("testBtn1").addEventListener("click", () => {
//     let k = prompt("Key");
//     let v = prompt("Value");
//     let kv = {}
//     kv[k] = v
//     set(kv);
//     get(k)
//     // let newValue;
//     // thisBrowser.storage.sync.get(['theme'], function (result) {
//     //     newValue = prompt("Theme: ", result.theme);
//     //     thisBrowser.storage.sync.set({
//     //         theme: newValue,
//     //     }, function () {
//     //         console.log("Settings saved");
//     //     });
//     // });
// });

// document.getElementById("testBtn2").addEventListener("click", () => {
//     let newValue = prompt("Key");
//     get(`${newValue}`);
//     // let newValue;
//     // thisBrowser.storage.sync.get(['theme'], function (result) {
//     //     newValue = prompt("Theme: ", result.theme);
//     //     thisBrowser.storage.sync.set({
//     //         theme: newValue,
//     //     }, function () {
//     //         console.log("Settings saved");
//     //     });
//     // });
// });

document.getElementById("autoOutput").style.transform = "scale(0)";

function home() {
    document.getElementById("easySection").style.display = "block";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("advancedSection").style.display = "none";
}


document.getElementById("lang").addEventListener("click", switchLanguage)
function switchLanguage() {
    let kv = {};
    kv["lang"] = localSettings.lang == "fr" ? "en" : "fr";
    set(kv)
    getAll(updateAll);
}

function updtLang() {
    document.getElementById("lang").innerHTML = localSettings.lang == "fr" ? "FR" : "EN";
    document.getElementById("cButton").innerHTML = localSettings.lang == "fr" ? "Copier" : "Copy";
    document.getElementById("pButton").innerHTML = localSettings.lang == "fr" ? "Coller" : "Paste";
    document.getElementById("aButton").innerHTML = localSettings.lang == "fr" ? "Copier/Coller" : "Copy/Paste";
    document.getElementById("settingsH4").innerHTML = localSettings.lang == "fr" ? "Paramètres" : "Settings";
    // document.getElementById("cancelSettings").innerHTML = localSettings.lang == "fr" ? "Annuler" : "Cancel";
    document.getElementById("saveSettings").innerHTML = localSettings.lang == "fr" ? "Enregistrer" : "Save";
    document.getElementById("autoInput").placeholder = localSettings.lang == "fr" ? "Entrez votre texte à copier ou votre code ici" : "Enter your text to copy or your code here";
    document.getElementById("dataInput").placeholder = localSettings.lang == "fr" ? "Entrez votre texte à copier ici" : "Enter your text to copy here";
    document.getElementById("codeInput").placeholder = localSettings.lang == "fr" ? "Entrez votre code de presse papier ici" : "Enter your clipboard code here";
}

let inSettings = false;
document.getElementById("settings").addEventListener("click", () => {
    if (inSettings) {
        inSettings = false;
        home();
    } else {
        inSettings = true;
        document.getElementById("settingsSection").style.display = "block";
        document.getElementById("easySection").style.display = "none";
        document.getElementById("advancedSection").style.display = "none";
    }
});

// document.getElementById("cancelSettings").addEventListener("click", () => {
//     home();
// });

// document.getElementById("saveSettings").addEventListener("click", () => {
//     home();
// });

document.getElementById("saveSettings").addEventListener("click", () => {
    inSettings = false;
    home();
});


function updateAll() {
    console.log(localSettings);
    updtLang();
}

function initUpdateAll() {
    updateAll();
    home();
}

getAll(initUpdateAll);