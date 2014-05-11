function load(){
    if ((new RegExp('[0-9]*\.html$').test(document.location.href))) {
       addYesNoButton()
    }
    else {
        removeNos()
    }
}

setTimeout(load)

function no(reason) {
    pushToLocalStorage('no', {
        href : document.location.href,
        pid : (new RegExp('[0-9]*\.html$').exec(document.location.href))[0].split('.')[0], //gross
        reason : reason
    })
}

function yes(reason) {
    pushToLocalStorage('yes', {
        href : document.location.href,
        pid : (new RegExp('[0-9]*\.html$').exec(document.location.href))[0].split('.')[0], //gross
        reason : reason
    })
}

function pushToLocalStorage(key, value) {
    var str = localStorage.getItem(key) || '[]'
    values = JSON.parse(str)
    values.push(value)
    localStorage.setItem(key,  JSON.stringify(values))
}

function getFromLocalStorage(key) {
    var str = localStorage.getItem(key) || '[]'
    return JSON.parse(str)
}

function removeNos() {
    var nos = getFromLocalStorage('no')
    var selector = nos
        .map(function (no) {
            return '[data-pid="' + no.pid + '"]'
        })
        .join(',')

    var rule = selector + ' { display:none }'


    addStylesheet(rule)

}

function addYesNoButton() {
    var el = document.createElement('div')
    el.innerHTML = yesNoButtonTemplate
    el.classList.add('yesNoButton')

    document.body.appendChild(el)

    addStylesheet(yesNoButtonStyle)
    addYesNoEventHandlers(el)
}

function addStylesheet(cssText) {

    var sheet = (function() {
    var style = document.createElement("style");

    // Add the <style> element to the page
    document.head.appendChild(style);

    if (style.styleSheet) {
        style.styleSheet.cssText = cssText;
    } else {
        style.appendChild(document.createTextNode(cssText));
    }


    return style.sheet;
})();
}

function addYesNoEventHandlers (el) {
    el.querySelector('.yes').addEventListener('click', function () {
        yes()
        window.history.back()
    })
    el.querySelector('.no').addEventListener('click', function () {
        no()
        window.history.back()
    })

}

yesNoButtonTemplate = function() {/*
    <button class='yes'>Yes</button>
    <button class='no'>No</button>
*/}.toString().split('\n').slice(1,-1).join('\n') //neat!

yesNoButtonStyle = function() {/*
    .yesNoButton {
        position:fixed;
        top : 0;
        left:0;
    }
*/}.toString().split('\n').slice(1,-1).join('\n') //neat!

