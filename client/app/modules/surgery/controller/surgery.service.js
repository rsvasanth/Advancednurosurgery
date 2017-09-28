(function () {
  'use strict';
  angular
    .module('com.module.surgery')
    .service('SurgeryService', function ($state, CoreService, Surgery , gettextCatalog) {

      this.find = function () {
        return Surgery.find().$promise;
      };

      this.findById = function (id) {
        return Surgery.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (surgery) {
        return Surgery.upsert(surgery).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Surgery saved'),
              gettextCatalog.getString('Your Surgery is safe with us!')
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
            Surgery.deleteById({id: id}, function () {
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
