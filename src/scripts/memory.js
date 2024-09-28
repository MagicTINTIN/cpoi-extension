if (typeof browser === "undefined") {
    var thisBrowser = chrome;  // If browser is undefined, fall back to chrome
    var firefox = false;
} else {
    var thisBrowser = browser;
    var firefox = true;
}

let localSettings;

/**
 * Get values for key or list of keys
 * @param key 
 * @param callback that will take one arg
 */
function get(key, callback) {
    if (typeof key == "object") {
        if (firefox)
            thisBrowser.storage.sync.get(key).then((values) => {
                // console.log("VALUE: ", values);
                callback(values);
            }, (reason) => { console.error("ERROR WHILE GETTING SETTINGS", reason); });
        else
            thisBrowser.storage.sync.get(key, (values) => {
                // console.log("VALUE: ", values);
                callback(values);
            });
        return [];
    }
    else if (typeof key == "string") {
        if (firefox)
            thisBrowser.storage.sync.get([`${key}`]).then((value) => {
                //console.log("VALUE: ", value);
                callback(value);
            }, (reason) => { console.error("ERROR WHILE GETTING SETTINGS", reason); });
        else
            thisBrowser.storage.sync.get([`${key}`], (value) => {
                //console.log("VALUE: ", value);
                callback(value);
            });
        return "";
    }
    else
        return console.log("The following type is not gettable:", key);
}

/**
 * Set key values
 * @param kvObject {key: value, key2: value2...}
 * @returns nothing
 */
function set(kvObject) {
    console.log(kvObject);
    if (typeof kvObject == "object") {
        if (firefox)
            browser.storage.sync.set(kvObject).then(() => {
                console.log("Settings saved");
            }, (reason) => { console.error("ERROR WHILE GETTING SETTINGS", reason); });
        else
            thisBrowser.storage.sync.set(kvObject, function () { console.log("Settings saved"); });
    }
    else
        return console.log("The following type is not settable:", key);
}

function getAll(callback) {
    get(["theme", "lang", "mode", "instance", "type"], (values) => {
        if (!values["theme"]) values.theme = "dark";
        if (!values["lang"]) values.lang = "en";
        if (!values["mode"]) values.mode = "easy";
        if (!values["type"]) values.type = "n";
        if (!values["instance"]) values.instance = "https://cpoi.softplus.fr/";
        localSettings = values;
        callback();
    });

}