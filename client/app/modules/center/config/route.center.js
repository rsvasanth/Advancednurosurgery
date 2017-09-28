(function () {
  'use strict';
  angular
    .module('com.module.center')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.center', {
          abstract: true,
          url: '/center',
          templateUrl: 'modules/center/views/main.html'
        })
        .state('app.center.list', {
          url: '',
          templateUrl: 'modules/center/views/list.html',
          controllerAs: 'ctrl',
          controller: function (center) {
            this.center = center;
          },
          resolve: {
            center: function (CenterService) {
              return CenterService.find();
            }
          }
        }).state('app.center.add', {
              url: '/add',
              templateUrl: 'modules/center/views/form.html',
              controllerAs: 'ctrl',
              controller: function ($state, CenterService, center) {
                this.center = center;
                this.formFields = CenterService.getFormFields();
                this.formOptions = {};
                this.submit = function () {
                  CenterService.upsert(this.center).then(function () {
                    $state.go('^.list');
                  });
                };
              },
              resolve: {
                center: function () {
                  return {};
                }
              }
            })    .state('app.center.edit', {
                  url: '/:id/edit',
                  templateUrl: 'modules/center/views/form.html',
                  controllerAs: 'ctrl',
                  controller: function ($state, CenterService, center) {
                    this.center = center;
                    this.formFields = CenterService.getFormFields();
                    this.formOptions = {};
                    this.submit = function () {
                      CenterService.upsert(this.center).then(function () {
                        $state.go('^.list');
                      });
                    };
                  },
                  resolve: {
                    center: function ($stateParams, CenterService) {
                      return CenterService.findById($stateParams.id);
                    }
                  }
                })
                .state('app.center.view', {
                  url: '/:id',
                  templateUrl: 'modules/center/views/view.html',
                  controllerAs: 'ctrl',
                  controller: function (center) {
                    this.center = center;
                  },
                  resolve: {
                    center: function ($stateParams, CenterService) {
                      return CenterService.findById($stateParams.id);
                    }
                  }
                })
                .state('app.center.delete', {
                  url: '/:id/delete',
                  template: '',
                  controllerAs: 'ctrl',
                  controller: function ($state, CenterService, center) {
                    CenterService.delete(center.id, function () {
                      $state.go('^.list');
                    }, function () {
                      $state.go('^.list');
                    });
                  },
                  resolve: {
                    center: function ($stateParams, CenterService) {
                      return CenterService.findById($stateParams.id);
                    }
                  }
                });

    });

})();
