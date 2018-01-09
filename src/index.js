import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';

const fields = {
  asyncBlurFields: PropTypes.arrayOf(PropTypes.string),
  destroyOnUnmount: PropTypes.bool,
  forceUnregisterOnUnmount: PropTypes.bool,
  enableReinitialize: PropTypes.bool,
  keepDirtyOnReinitialize: PropTypes.bool,
  form: PropTypes.string.required,
  initialValues: PropTypes.object,
  getFormState: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitFail: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  propNamespace: PropTypes.string,
  validate: PropTypes.func,
  warn: PropTypes.func,
  touchOnBlur: PropTypes.bool,
  touchOnChange: PropTypes.bool,
  persistentSubmitErrors: PropTypes.bool,
  registeredFields: PropTypes.any
};

const fieldKeys = Object.keys(fields);

export default class ReduxForm extends Component {
  constructor(args) {
    super(args);

    Object.keys(fields).forEach(name => {
      this[`_${name}`] = ReduxForm.propagate(this, name);
    });

    this.state = {
      Form: this.createReduxForm(this.props)(this.renderForm)
    };
  }

  static didPropsChange = (prevProps, nextProps) =>
    fieldKeys.some(name => !isEqual(prevProps[name], nextProps[name]));

  static propagate = (self, name) => (...args) => self.props[name](...args);

  getReduxFormProps = props =>
    fieldKeys.filter(name => !isUndefined(props[name])).reduce(
      (all, name) => ({
        ...all,
        [name]: fields[name] === PropTypes.func ? this[`_${name}`] : props[name]
      }),
      {}
    );

  createReduxForm = props => reduxForm(this.getReduxFormProps(props));

  componentWillReceiveProps(nextProps) {
    const _currProps = ReduxForm.getReduxFormProps(this.props);
    const _nextProps = ReduxForm.getReduxFormProps(nextProps);

    if (!ReduxForm.didPropsChange(_currProps, _nextProps)) {
      return;
    }

    this.setState({
      Form: this.createReduxForm(this.props)(this.renderForm)
    });
  }

  renderForm = childProps => {
    const { children } = this.props;
    return children(childProps);
  };

  render = () => {
    const { Form } = this.state;
    return React.createElement(Form);
  };
}

ReduxForm.propTypes = {
  children: PropTypes.func.isRequired,
  ...fields
};
