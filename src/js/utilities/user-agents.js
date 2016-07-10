// store user agent checks here and export them, that way they're only ever checked once
import {globalEls} from '../utilities/global-els';


let navPlatform = navigator.platform,

    userAgents = {
        isIE: navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0,
        isWindows: navigator.platform.toUpperCase().indexOf('WIN') !== -1,
        isIOS: /iPad|iPhone|iPod/.test(navigator.platform)

    }

// add html element classes as needed
if (userAgents.isIOS) {
    globalEls.html.classList.add('iOS');
}

if (userAgents.isIE) {
    globalEls.html.classList.add('ie');
}

export {userAgents}