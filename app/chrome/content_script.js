var defaultConfig = 'MathJax.Hub.Config({config: ["MMLorHTML.js"],extensions:["TeX/bbox.js","TeX/color.js","TeX/noErrors.js","TeX/noUndefined.js","TeX/AMSmath.js","TeX/AMSsymbols.js","TeX/AMScd.js","TeX/autobold.js"],jax:["input/TeX"]});MathJax.Hub.Startup.onload()';

var defaultConfig2 = 'MathJax.Hub.Config({tex2jax: {inlineMath: [ ["$","$"]],displayMath: [ ["$$","$$"]],processEscapes: true},displayAlign: "left"})';

/**
 * Show the LaTeX code rendered.
 */
function showTex() {

    //Replace the Mathjax with Tex Code
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var scp = scripts[i];
        if (scp.type.indexOf("math/tex") != -1) {
            if (scp.type.indexOf("display") != -1) {
                var texCode = document.createElement("null");
                texCode.innerHTML = "$$" + scp.innerHTML + "$$";
                scp.parentNode.replaceChild(texCode, scp);
            } else {
                var texCode = document.createElement("null");
                texCode.innerHTML = "$" + scp.innerHTML + "$";
                scp.parentNode.replaceChild(texCode, scp);
            }
        }
    }

    var mj = document.getElementsByTagName('span');
    for (var i = mj.length - 1; i >= 0; i--) {
        //Removing Equations
        var mjx = mj[i];
        if (mjx.className === "MathJax") {
            mjx.parentNode.removeChild(mjx);
        }
    }

}

/**
 * Temporarily load MathJax script.
 */
function tempMathJax() {
    var pathToMathJax = chrome.extension.getURL('components/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = pathToMathJax;

    document.getElementsByTagName("head")[0].appendChild(script);

    var script2 = document.createElement('script');
    script2.type = 'text/x-mathjax-config';
    script2.text = 'MathJax.Hub.Config({config: ["MMLorHTML.js"],extensions:["TeX/bbox.js","TeX/color.js","TeX/noErrors.js","TeX/noUndefined.js","TeX/AMSmath.js","TeX/AMSsymbols.js","TeX/AMScd.js","TeX/autobold.js"],jax:["input/TeX"],tex2jax: {inlineMath: [ ["$","$"]],displayMath: [ ["$$","$$"]],processEscapes: true},displayAlign: "left"});MathJax.Hub.Startup.onload()';

    document.getElementsByTagName("head")[0].appendChild(script2);
}

function mathParsing(wolframMath) {

}

/**
 * Load MathJax according to the two configurations.
 *
 * @param config The first configuration.
 * @param config2 The second configuration.
 */
function loadMathJax(config, config2) {

    var pathToMathJax = chrome.extension.getURL("components/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
    var script = document.createElement("script");
    script.src = pathToMathJax;

    if (config != '') {
        script.text = config;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    if (config2 != '') {
        script.text = config2;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    console.log('fine');

}


/**
 * Listen from the background.
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Page received message:");
        console.log(request);

        if (request.render) {
            if (request.replace) {
                ReplacePictures();
            }
            loadMathJax(defaultConfig, request.config);
            sendResponse({
                renderStatus: 'Fine!'
            });
        } else {
            if (request.replace) {
                ReplacePictures();
                loadMathJax(defaultConfig, '');
                sendResponse({
                    renderStatus: 'Fine! With Replacement'
                });
            }
        }
        if (request.update) {
            tempMathJax();
        }
    });

/**
 * Determine whether an element has the given class.
 *
 * @param element
 * @param cls
 * @returns {boolean}
 */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * Replace the math rendered to images.
 */
function ReplacePictures() {

    // Get images

    var images = document.getElementsByTagName('img');
    for (var i = images.length - 1; i >= 0; i--) {

        // Replacing math

        var img = images[i];

        if (hasClass(img, "tex") || hasClass(img, "latex") || hasClass(img, "inlineforrmula")) {
            var script = document.createElement("script");
            if (img.parentNode.tagName === "DD") {
                script.type = "math/tex; mode=display";
            } else {
                script.type = "math/tex";
            }
            script.text = img.alt;
            img.parentNode.replaceChild(script, img);
        }

        if (hasClass(img, "latexcenter") || hasClass(img, "numbereddequation")) {
            var script = document.createElement("script");
            script.type = "math/tex; mode=display";
            script.text = img.alt;
            img.parentNode.replaceChild(script, img);
        }

    }
}