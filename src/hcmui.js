import angular from 'angular';
import notifyModule from './notify/notify';
import toastModule from './toast/toast';
import actionSheetModule from './actionSheet/actionSheet'
import topTipsModule from './topTips/topTips'


export default angular.module('hcmui.js',[
    notifyModule.name,
    toastModule.name,
    actionSheetModule.name,
    topTipsModule.name
]);
