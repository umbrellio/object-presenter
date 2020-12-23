function ObjectPresenter(object) {
  var self = this

  this.object = object
  var objectFields = Object.keys(object)
  var presenterFields = Object.getOwnPropertyNames(
    Object.getPrototypeOf(this)
  ).filter(function (f) {
    return f !== 'constructor'
  })
  var fieldsToDelegate = objectFields.filter(function (fields) {
    return Array.prototype.indexOf.call(presenterFields, fields) === -1
  })

  fieldsToDelegate.forEach(function (field) {
    Object.defineProperty(self, field, {
      get: function () {
        return object[field]
      },
    })
  })

  this.__presenterFields__ = presenterFields
}

ObjectPresenter.prototype.serialize = function serialize() {
  var self = this

  var serialized = Object.assign({}, this.object)

  this.__presenterFields__.forEach(function (fieldName) {
    serialized[fieldName] = self[fieldName]
  })

  return serialized
}

module.exports = ObjectPresenter
