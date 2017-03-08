import angular from 'angular'
import hcmui from '../src/hcmui.js'

require('hcmui');

export default angular
    .module('hcmui.sample',[
        hcmui.name
    ])
    .controller('HcmuiController',['$hcmuiNotify','$scope',function ($hcmuiNotify,$scope) {
        $scope.$ctrl=this;

        this.alert=function(){
            $hcmuiNotify.alert('你好，HCM Cloud！',{
                title:'提示'
            }).then(function(){
                console.log('OK Close')
            },function () {
                console.log('Cancel Close')
            });
        };
        this.confirm=function(){
            $hcmuiNotify.confirm('你好，HCM Cloud！',{
                title:'提示'
            }).then(function(){
                console.log('OK Close')
            },function () {
                console.log('Cancel Close')
            });
        }
    }])
