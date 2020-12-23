module.exports = class ObjectPresenter {
  constructor(object) {
    this.object = object
    const objectFields = Object.keys(object)
    const presenterFields = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter((f) => f !== 'constructor')
    const fieldsToDelegate = objectFields.filter(
      (f) => !presenterFields.includes(f)
    )

    fieldsToDelegate.forEach((field) => {
      Object.defineProperty(this, field, {
        get() {
          return object[field]
        },
      })
    })

    this.__presenterFields__ = presenterFields
  }

  serialize() {
    return Object.assign(
      {},
      this.object,
      this.__presenterFields__.reduce(
        (serialized, fieldName) =>
          Object.assign({ [fieldName]: this[fieldName] }, serialized),
        {}
      )
    )
  }
}
