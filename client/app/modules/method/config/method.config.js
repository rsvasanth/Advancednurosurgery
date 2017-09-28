(function () {
  'use strict';
  angular
    .module('com.module.method')
    .run(function ($rootScope, Surgerymethod , gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Surgery Method'), 'app.method.list', 'fa-file-o');

      Surgerymethod.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Surgery Method '), 'bg-blue', 'ion-clipboard', data.length, 'app.method.list');
      });

    });

})();
