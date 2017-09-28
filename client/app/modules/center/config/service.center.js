(function () {
  'use strict';
  angular
    .module('com.module.center')
    .service('CenterService', function ($state, CoreService, Surgerycenter  , gettextCatalog) {

      this.find = function () {
        return Surgerycenter.find().$promise;
      };

      this.findById = function (id) {
        return Surgerycenter.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (center) {
        return Surgerycenter.upsert(center).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Surgery center saved'),
              gettextCatalog.getString('Your Surgery center is safe with us!')
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
            Surgerycenter.deleteById({id: id}, function () {
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
          },
          {
            key: 'lat',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('latitude '),
              required: true
            }
          }
          {
            key: 'lon',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('longitude'),
              required: true
            }
          }
        ];
      };
    });

})();
