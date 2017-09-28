(function () {
  'use strict';
  angular
    .module('com.module.method')
    .service('MethodService', function ($state, CoreService, Surgerymethod  , gettextCatalog) {

      this.find = function () {
        return Surgerymethod.find().$promise;
      };

      this.findById = function (id) {
        return Surgerymethod.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (method) {
        return Surgerymethod.upsert(method).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Surgery method saved'),
              gettextCatalog.getString('Your Surgery method is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving Surgery '),
              gettextCatalog.getString('This Surgery could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
          Surgerymethod .deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Surgery deleted'),
                gettextCatalog.getString('Your Surgery is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Surgery'),
                gettextCatalog.getString('Your Surgery is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          }
        ];
      };
    });

})();
