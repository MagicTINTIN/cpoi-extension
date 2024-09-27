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

function updateAndClipboardCopy(obj, value) {
    console.log(value);
    obj.value = value;
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
    // console.log(`${localSettings.instance}?${lang}&e=${urlEncode(content)}`);
    fetch(`${localSettings.instance}?${lang}&e=${urlEncode(content)}`)
        .then(response => response.text())
        .then(text => {
            updateAndClipboardCopy(ret, text.slice(1));
        });
}

document.getElementById("autoOutput").style.transform = "scale(0)";

// COPY PASTE BUTTONS

document.getElementById("aButton").addEventListener("click", () => {
    getEasyFromCPOI(document.getElementById("autoOutput"), document.getElementById("autoInput").value);
    if (document.getElementById("autoInput").value == '') return;
    document.getElementById("autoOutput").style.transform = "scale(1)";
});
document.getElementById("cButton").addEventListener("click", () => { getCodeFromCPOI(document.getElementById("codeInput"), 'c', document.getElementById("dataInput").value) });
document.getElementById("pButton").addEventListener("click", () => { getClipboardFromCPOI(document.getElementById("dataInput"), document.getElementById("codeInput").value) });

function home() {
    document.getElementById("easySection").style.display = localSettings.mode == "easy" ? "block" : "none";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("advancedSection").style.display = localSettings.mode == "easy" ? "none" : "block";
    document.getElementById("qrCodeSection").style.display = "none";
}

// SUBMENUS

let inSettings = false;
document.getElementById("settings").addEventListener("click", () => {
    if (inSettings) {
        saveInstance();
        inSettings = false;
        home();
        autoFocus();
    } else {
        inSettings = true;
        document.getElementById("settingsSection").style.display = "block";
        document.getElementById("easySection").style.display = "none";
        document.getElementById("advancedSection").style.display = "none";
        document.getElementById("qrCodeSection").style.display = "none";
    }
});

document.getElementById("saveSettings").addEventListener("click", () => {
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
    console.log(e.code);
    
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
    console.log(e.code);
    
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
    console.log(e.code);
    
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
