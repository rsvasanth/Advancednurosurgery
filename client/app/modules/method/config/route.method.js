(function () {
  'use strict';
  angular
    .module('com.module.method')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.method', {
          abstract: true,
          url: '/method',
          templateUrl: 'modules/method/views/main.html'
        })
        .state('app.method.list', {
          url: '',
          templateUrl: 'modules/method/views/list.html',
          controllerAs: 'ctrl',
          controller: function (method) {
            this.method = method;
          },
          resolve: {
            method: function (MethodService) {
              return MethodService.find();
            }
          }
        }).state('app.method.add', {
              url: '/add',
              templateUrl: 'modules/method/views/form.html',
              controllerAs: 'ctrl',
              controller: function ($state, MethodService, method) {
                this.method = method;
                this.formFields = MethodService.getFormFields();
                this.formOptions = {};
                this.submit = function () {
                  MethodService.upsert(this.method).then(function () {
                    $state.go('^.list');
                  });
                };
              },
              resolve: {
                method: function () {
                  return {};
                }
              }
            })    .state('app.method.edit', {
                  url: '/:id/edit',
                  templateUrl: 'modules/method/views/form.html',
                  controllerAs: 'ctrl',
                  controller: function ($state, MethodService, method) {
                    this.method = method;
                    this.formFields = MethodService.getFormFields();
                    this.formOptions = {};
                    this.submit = function () {
                      MethodService.upsert(this.method).then(function () {
                        $state.go('^.list');
                      });
                    };
                  },
                  resolve: {
                    method: function ($stateParams, MethodService) {
                      return MethodService.findById($stateParams.id);
                    }
                  }
                })
                .state('app.method.view', {
                  url: '/:id',
                  templateUrl: 'modules/method/views/view.html',
                  controllerAs: 'ctrl',
                  controller: function (method) {
                    this.method = method;
                  },
                  resolve: {
                    method: function ($stateParams, MethodService) {
                      return MethodService.findById($stateParams.id);
                    }
                  }
                })
                .state('app.method.delete', {
                  url: '/:id/delete',
                  template: '',
                  controllerAs: 'ctrl',
                  controller: function ($state, MethodService, method) {
                    MethodService.delete(method.id, function () {
                      $state.go('^.list');
                    }, function () {
                      $state.go('^.list');
                    });
                  },
                  resolve: {
                    method: function ($stateParams, MethodService) {
                      return MethodService.findById($stateParams.id);
                    }
                  }
                });

    });

})();
