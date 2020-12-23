# object-presenter

[![Build Status](https://travis-ci.org/umbrellio/object-presenter.svg?branch=master)](https://travis-ci.org/umbrellio/object-presenter)
[![Coverage Status](https://coveralls.io/repos/github/umbrellio/object-presenter/badge.svg?branch=master)](https://coveralls.io/github/umbrellio/object-presenter?branch=master)

Simple, solid object presenters.

## Installation

Install with yarn:

```sh
yarn add object-presenter
# or npm:
npm i -S object-presenter
```

## Usage

```js
import ObjectPresenter from 'object-presenter'
import moment from 'moment'

class UserPresenter extends ObjectPresenter {
  get fullName() {
    return `${this.object.firstName} ${this.object.lastName}`
  }

  get birthdate() {
    return moment(this.object.birthdate).format('MMM Do YY')
  }
}

const rawUser = { firstName: 'Elon', lastName: 'Musk', birthdate: 46976100000 }
const user = new UserPresenter(rawUser)

console.log(user.fullName) // => Elon Musk
console.log(user.firstName) // => Elon
console.log(user.birthdate) // => Jun 28th 71

console.log(user.serialize()) // => { firstName: 'Elon', lastName: 'Musk', fullName: 'Elon Musk', birthdate: 'Jun 28th 71' }
```

To use in native ES6, import `object-presenter/es6` instead.

## License

Released under MIT License.

## Authors

Created by Alexander Komarov.

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
