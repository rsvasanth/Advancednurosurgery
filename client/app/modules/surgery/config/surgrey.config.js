(function () {
  'use strict';
  angular
    .module('com.module.surgery')
    .run(function ($rootScope, Surgery, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Surgery'), 'app.surgery.list', 'fa-file-o');

      Surgery.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Surgery '), 'bg-green', 'ion-clipboard', data.length, 'app.surgery.list');
      });

    });

})();
