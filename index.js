module.exports = function ObjectPresenter (object) {
  var self = this

  this.object = object
  var objectFields = Object.keys(object)
  var presenterFields = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
  var fieldsToDelegate = objectFields.filter(function (fields) {
    return Array.prototype.indexOf.call(presenterFields, fields) === -1
  })

  fieldsToDelegate.forEach(function (field) {
    Object.defineProperty(self, field, {
      get: function () {
        return object[field]
      }
    })
  })
}
