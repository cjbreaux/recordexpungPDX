import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import { logIn } from '../../redux/system/actions';
import { SystemState } from '../../redux/system/types';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

interface Props {
  system: SystemState;
  logIn: typeof logIn;
}
interface State {
  email: string;
  emailHasInput: boolean;
  emailIsValid: null | boolean;
  missingInputs: null | boolean;
}

class ForgotPassword extends React.Component<Props, State> {
  state: State = {
    email: '',
    emailHasInput: false,
    emailIsValid: null, // email validation to be added
    missingInputs: null
  };

  handleChange = (e: React.BaseSyntheticEvent) => {
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635 for why we're
    // using the "any" type.
    this.setState<any>({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.validateForm();
  };

  emailCheck = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  validateForm = () => {
    this.setState({
      emailHasInput: this.state.email.trim().length === 0
    });
    this.setState({
      missingInputs: this.state.email.trim().length === 0
    });
    this.setState({
      emailIsValid: this.emailCheck(this.state.email)
    });
  };

  public render() {
    console.log(this.state);
    return (
      <main className="mw8 center ph2">
        <section className="mw6 center cf mt4 mb3 pa4 pa5-ns pt4-ns bg-white shadow br3">
          <Logo />
          <form
            onSubmit={this.handleSubmit}
            noValidate
            aria-label="Forgot Password"
          >
            <fieldset>
              <legend className="f4 fw7 pt4">Forgot your password?</legend>
              <label htmlFor="email" className="db mt4 mb1 fw6">
                Email
              </label>
              <input
                id="email"
                className="w-100 mb4 pa3 br2 b--black-20"
                type="email"
                required
                onChange={this.handleChange}
              />
              <button
                className="bg-blue white bg-animate hover-bg-dark-blue fw6 db w-100 br2 pv3 ph4 mb4 tc"
                type="submit"
              >
                Send email to reset password
              </button>
            </fieldset>
            <div role="alert">
              {this.state.missingInputs === true ||
              this.state.emailIsValid === false ? (
                <p className="bg-washed-red mb3 pa3 br3 fw6">
                  Please enter a valid email.
                </p>
              ) : null}
            </div>
            <div role="status">
              {this.state.missingInputs === false &&
              this.state.emailIsValid === true ? (
                <p className="bg-washed-green mb3 pa3 br3 fw6">
                  Thanks, we're sending an email that will help you reset your
                  password.
                </p>
              ) : null}
            </div>
          </form>
          <div className="tc">
            <Link to="/" className="link underline" href="#">
              Return to log in
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(
  mapStateToProps,
  { logIn }
)(ForgotPassword);