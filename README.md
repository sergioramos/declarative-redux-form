# declarative-redux-form

[![npm](https://img.shields.io/npm/v/declarative-redux-form.svg?style=flat-square)](https://www.npmjs.com/package/declarative-redux-form)
[![License: BSD 3-clause "New" or "Revised" License](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/BSD-3-Clause)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[![David](https://img.shields.io/david/ramitos/declarative-redux-form.svg?style=flat-square)](https://david-dm.org/ramitos/declarative-redux-form)
[![David](https://img.shields.io/david/dev/ramitos/declarative-redux-form.svg?style=flat-square)](https://david-dm.org/ramitos/declarative-redux-form?type=dev)
[![David](https://img.shields.io/david/peer/ramitos/declarative-redux-form.svg?style=flat-square)](https://david-dm.org/ramitos/declarative-redux-form?type=peer)

Declarative [redux-form](https://redux-form.com).

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [License](#license)

## Install

```
yarn add --dev declarative-redux-form
```

## Usage

```js
import React from 'react';
import ReduxForm from 'declarative-redux-form';
import { Field } from 'redux-form';

export default () => (
  <ReduxForm form="form-name">
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="name" type="text" />
        <button type="submit" />
      </form>
    )}
  </ReduxForm>
);
```

## License

BSD-3-Clause
