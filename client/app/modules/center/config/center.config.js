(function () {
  'use strict';
  angular
    .module('com.module.center')
    .run(function ($rootScope, Surgerycenter, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Surgery Center'), 'app.center.list', 'fa-file-o');

      Surgerycenter.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Surgery Center'), 'bg-red', 'ion-clipboard', data.length, 'app.center.list');
      });

    });

})();
