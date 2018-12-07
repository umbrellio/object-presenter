module.exports = class ObjectPresenter {
  constructor (object) {
    this.object = object
    const objectFields = Object.keys(object)
    const presenterFields = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    const fieldsToDelegate = objectFields.filter(f => !presenterFields.includes(f))

    fieldsToDelegate.forEach(field => {
      Object.defineProperty(this, field, {
        get () {
          return object[field]
        },
      })
    })
  }
}
