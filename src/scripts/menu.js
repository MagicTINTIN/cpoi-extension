function urlEncode(input) {
    return input.split('').map(c => {
        if (/[a-zA-Z0-9\-_.~?]/.test(c)) {
            return c;
        } else {
            return '%' + encodeURIComponent(c).slice(1).toUpperCase();
        }
    }).join('');
}

// COMMINUCATION FUNCTIONS

const regex = /^[a-z]{1,6}\-[a-z]{1,6}\-[a-z]{1,6}$/;
let lastStringRequest = "";
let lastCode = "";

function updateAndClipboardCopy(obj, value, isCode = false) {
    console.log(value);
    obj.value = value;
    lastCode = value;
    navigator.clipboard.writeText(value);
    if (isCode) {
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrGenButton").style.transform = "scale(1)";
        new QRCode(document.getElementById("qrcode"), `${localSettings.instance}?qr=1&l=${localSettings.lang}&e=${urlEncode(value)}`);
        document.getElementById("qrValue").innerHTML = `${localSettings.instance}?qr=1&l=${localSettings.lang}&e=${urlEncode(value)}`;
    }
}

function getCodeFromCPOI(ret, mode, content, lang = 'en') {
    if (content == '' || mode == '' || content == lastStringRequest) return ret.value = lastCode;
    lastStringRequest = content;
    
    fetch(`${localSettings.instance}?l=${lang}&t=${localSettings.type}${localSettings.const ? "&m=const" : ""}&${mode}=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1), true);
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
    if (content == '' || content == lastStringRequest) return ret.value = lastCode;
    lastStringRequest = content;
    
    // console.log(`${localSettings.instance}?${lang}&e=${urlEncode(content)}`);
    fetch(`${localSettings.instance}?l=${lang}&t=${localSettings.type}&e=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            if (regex.test(text.slice(1)))
                updateAndClipboardCopy(ret, text.slice(1), true);
            else
                updateAndClipboardCopy(ret, text.slice(1));
        });
}

document.getElementById("autoOutput").style.transform = "scale(0)";
document.getElementById("qrGenButton").style.transform = "scale(0)";

// COPY PASTE BUTTONS

document.getElementById("aButton").addEventListener("click", () => {
    getEasyFromCPOI(document.getElementById("autoOutput"), document.getElementById("autoInput").value, localSettings.lang);
    if (document.getElementById("autoInput").value == '') return;
    document.getElementById("autoOutput").style.transform = "scale(1)";
});
document.getElementById("cButton").addEventListener("click", () => { getCodeFromCPOI(document.getElementById("codeInput"), 'c', document.getElementById("dataInput").value, localSettings.lang) });
document.getElementById("pButton").addEventListener("click", () => { getClipboardFromCPOI(document.getElementById("dataInput"), document.getElementById("codeInput").value) });

function home() {
    document.getElementById("easySection").style.display = localSettings.mode == "easy" ? "block" : "none";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("classicSection").style.display = localSettings.mode == "easy" ? "none" : "block";
    document.getElementById("qrCodeSection").style.display = "none";
    document.getElementById("advancedSection").style.display = localSettings.mode == "advanced" ? "block" : "none";
}

// SUBMENUS

let inSettings = false;
document.getElementById("settings").addEventListener("click", () => {
    if (inSettings) {
        document.getElementById("settings").innerHTML = "⚙";
        saveInstance();
        inSettings = false;
        home();
        autoFocus();
    } else {
        document.getElementById("settings").innerHTML = "⨯";
        document.getElementById("qrIcon").src = "../images/qrcode.svg";
        inSettings = true;
        inQrcode = false;
        document.getElementById("settingsSection").style.display = "block";
        document.getElementById("easySection").style.display = "none";
        document.getElementById("classicSection").style.display = "none";
        document.getElementById("qrCodeSection").style.display = "none";
    }
});

let inQrcode = false;
document.getElementById("qrGenButton").addEventListener("click", () => {
    if (inQrcode) {
        document.getElementById("qrIcon").src = "../images/qrcode.svg";
        inQrcode = false;
        home();
    } else {
        document.getElementById("settings").innerHTML = "⚙";
        document.getElementById("qrIcon").src = "../images/cross.svg";
        inQrcode = true;
        inSettings = false;
        document.getElementById("settingsSection").style.display = "none";
        document.getElementById("easySection").style.display = "none";
        document.getElementById("classicSection").style.display = "none";
        document.getElementById("qrCodeSection").style.display = "block";
    }
});

document.getElementById("saveSettings").addEventListener("click", () => {
    document.getElementById("settings").innerHTML = "⚙";
    saveInstance();
    inSettings = false;
    home();
    autoFocus();
});

function autoFocus() {
    if (localSettings.mode == "easy")
        document.getElementById("autoInput").focus();
    else
        document.getElementById("dataInput").focus();
}

// KEYBOARD SHORTCUTS

var autoInput = document.getElementById("autoInput");
var dataInput = document.getElementById("dataInput");
var codeInput = document.getElementById("codeInput");
var ctrlPressed = false;
autoInput.addEventListener("keydown", function (e) {
    // console.log(e.code);

    if (e.key === "Enter") {
        if (ctrlPressed)
            document.getElementById("aButton").click();
    } else if (e.key === "Control") {
        ctrlPressed = true;
    }
});
autoInput.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
        ctrlPressed = false;
    }
});

dataInput.addEventListener("keydown", function (e) {
    // console.log(e.code);

    if (e.key === "Enter") {
        if (ctrlPressed)
            document.getElementById("cButton").click();
    } else if (e.key === "Control") {
        ctrlPressed = true;
    }
});
dataInput.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
        ctrlPressed = false;
    }
});

codeInput.addEventListener("keydown", function (e) {
    // console.log(e.code);

    if (e.key === "Enter") {
        if (ctrlPressed)
            document.getElementById("pButton").click();
    } else if (e.key === "Control") {
        ctrlPressed = true;
    }
});
codeInput.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
        ctrlPressed = false;
    }
});
