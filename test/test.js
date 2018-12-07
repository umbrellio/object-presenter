const assert = require('assert')
const moment = require('moment')
const ObjectPresenter = require('../index')
const ObjectPresenterES6 = require('../es6')

;[
  { label: 'ObjectPresenter', klass: ObjectPresenter },
  { label: 'ObjectPresenter (ES6)', klass: ObjectPresenterES6 }
].forEach(({ label, klass }) => {
  const rawUser = { firstName: 'Elon', lastName: 'Musk', birthdate: 46976100000 }

  class UserPresenter extends klass {
    get fullName() {
      return `${this.object.firstName} ${this.object.lastName}`
    }

    get birthdate() {
      return moment(this.object.birthdate).format('MMM Do YY')
    }
  }

  const user = new UserPresenter(rawUser)

  describe(label, () => {
    it('decorates object fields', () => {
      assert.equal(user.fullName, 'Elon Musk')
    })

    it('does not modify the object', () => {
      assert.equal(user.birthdate, 'Jun 28th 71')
      assert.equal(rawUser.birthdate, 46976100000)
    })

    it('does not copy values', () => {
      // don't modify global state
      const rawUserCopy = { ...rawUser }
      const userCopy = new UserPresenter(rawUserCopy)

      rawUserCopy.firstName = 'Jordan'
      rawUserCopy.lastName = 'Peterson'

      assert.equal(userCopy.fullName, 'Jordan Peterson')
    })

    it('delegates access to object', () => {
      assert.equal(user.firstName, 'Elon')
    })
  })
})
