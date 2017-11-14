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

    this.state = {
      Form: ReduxForm.createReduxForm(this.props)(this.renderForm)
    };
  }

  static didPropsChange = (prevProps, nextProps) =>
    fieldKeys.some(name => !isEqual(prevProps[name], nextProps[name]));

  static getReduxFormProps = props =>
    fieldKeys.filter(name => !isUndefined(props[name])).reduce(
      (all, name) => ({
        ...all,
        [name]: props[name]
      }),
      {}
    );

  static createReduxForm = props =>
    reduxForm(ReduxForm.getReduxFormProps(props));

  static cleanReduxFormProps = props =>
    Object.keys(props)
      .filter(name => fieldKeys.indexOf(name) < 0)
      .reduce(
        (all, name) => ({
          ...all,
          [name]: props[name]
        }),
        {}
      );

  componentWillReceiveProps(nextProps) {
    if (ReduxForm.didPropsChange(this.props, nextProps)) {
      return;
    }

    this.setState({
      Form: ReduxForm.createReduxForm(this.props)(this.renderForm)
    });
  }

  renderForm = childProps => {
    const { children } = this.props;
    return children(childProps);
  };

  render = () => {
    const parentProps = ReduxForm.cleanReduxFormProps(this.props);
    const { Form } = this.state;

    return React.createElement(Form, parentProps);
  };
}

ReduxForm.propTypes = {
  children: PropTypes.func.isRequired,
  ...fields
};
