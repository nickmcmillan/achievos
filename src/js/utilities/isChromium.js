// http://stackoverflow.com/a/13348618
let isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");


const notChrome = function() {
	setTimeout(()=> {
		document.documentElement.classList.add('not-chrome')
		document.documentElement.classList.remove('achievos-installed--true')
		document.documentElement.classList.remove('user-set--false')
	}, 600)
}

if (isIOSChrome) {
   // is Google Chrome on IOS
   notChrome()

} else if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
   // is Google Chrome
} else {
	notChrome()

}
