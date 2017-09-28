(function () {
  'use strict';
  angular
    .module('com.module.surgery')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.surgery', {
          abstract: true,
          url: '/surgery',
          templateUrl: 'modules/surgery/views/main.html'
        })
        .state('app.surgery.list', {
          url: '',
          templateUrl: 'modules/surgery/views/list.html',
          controllerAs: 'ctrl',
          controller: function (surgery) {
            this.surgery = surgery;
          },
          resolve: {
            surgery: function (SurgeryService) {
              return SurgeryService.find();
            }
          }
        })    .state('app.surgery.add', {
              url: '/add',
              templateUrl: 'modules/surgery/views/form.html',
              controllerAs: 'ctrl',
              controller: function ($state, SurgeryService, surgery) {
                this.surgery = surgery;
                this.formFields = SurgeryService.getFormFields();
                this.formOptions = {};
                this.submit = function () {
                  SurgeryService.upsert(this.surgery).then(function () {
                    $state.go('^.list');
                  });
                };
              },
              resolve: {
                surgery: function () {
                  return {};
                }
              }
            })
            .state('app.surgery.edit', {
               url: '/:id/edit',
               templateUrl: 'modules/surgery/views/form.html',
               controllerAs: 'ctrl',
               controller: function ($state, SurgeryService, surgery) {
                 this.surgery = surgery;
                 this.formFields = SurgeryService.getFormFields();
                 this.formOptions = {};
                 this.submit = function () {
                   SurgeryService.upsert(this.surgery).then(function () {
                     $state.go('^.list');
                   });
                 };
               },
               resolve: {
                 surgery: function ($stateParams, SurgeryService) {
                   return SurgeryService.findById($stateParams.id);
                 }
               }
             })
             .state('app.surgery.view', {
               url: '/:id',
               templateUrl: 'modules/surgery/views/view.html',
               controllerAs: 'ctrl',
               controller: function (surgery) {
                 this.surgery = surgery;
               },
               resolve: {
                 surgery: function ($stateParams, SurgeryService) {
                   return SurgeryService.findById($stateParams.id);
                 }
               }
             })
             .state('app.surgery.delete', {
               url: '/:id/delete',
               template: '',
               controllerAs: 'ctrl',
               controller: function ($state, SurgeryService, surgery) {
                 SurgeryService.delete(surgery.id, function () {
                   $state.go('^.list');
                 }, function () {
                   $state.go('^.list');
                 });
               },
               resolve: {
                 surgery: function ($stateParams, SurgeryService) {
                   return SurgeryService.findById($stateParams.id);
                 }
               }
             });;

    });

})();
