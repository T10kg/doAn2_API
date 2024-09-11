function browserName() {
    var Browser = navigator.userAgent;
    if (false || !!document.documentMode) {
        Browser = 'IE';
    } else if (typeof InstallTrigger !== 'undefined') {
        Browser = 'Firefox';
    } else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        Browser = 'Chrome';
    } else if (/constructor/i.test(window.HTMLElement) || (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
    }
    )(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {
        Browser = 'Safari';
    } else if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        Browser = 'Opera';
    } else {
        Browser = 'UNKNOWN';
    }
    return Browser;
}
function browserVersion() {
    var index;
    var version = 0;
    var name = browserName();
    var info = navigator.userAgent;
    index = info.indexOf(name) + name.length + 1;
    version = parseFloat(info.substring(index, index + 3));
    return version;
}
if (browserName() == 'IE') {
    alert("Hiện Tại Trình Duyêt " + browserName() + " Phiên Bảng " + browserVersion() + "Đã Quá Củ Bạn Hãy Sử Dụng Chrome và Firefox Để Sử Dụng Được Hết Chức Năng Của Chương Trình");
    document.location = 'https://dkmh.ctu.edu.vn/htql/sv/download.html';
}
