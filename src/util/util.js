import angular from 'angular'


function hcmuiUtil() {
    let service = {};

    service.isAndroid = function () {
        let ua=navigator.userAgent;
        return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    };

    return service;
}



export default angular
    .module('hcmui.util', [])
    .factory('$hcmuiUtil', hcmuiUtil)
