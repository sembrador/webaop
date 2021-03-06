import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import './VerifyEmailAlert.scss';

const handleResendVerificationEmail = (emailAddress) => {
  Meteor.call('users.sendVerificationEmail', (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
    }
  });
};

const VerifyEmailAlert = ({ userId, emailVerified, emailAddress }) => (
  userId && !emailVerified ? (
    <div className="VerifyEmailAlert">
      <Alert className="verify-email text-center">
        <p>Estimado Socio, Por favor <strong>verifique su correo electrónico</strong> ({emailAddress}) para nosotros.
          <Button
            bsStyle="link"
            onClick={() => handleResendVerificationEmail(emailAddress)}
            href="#">
            Re-enviar verificación de correo
          </Button>
        </p>
      </Alert>
    </div>
  ) : null
);

VerifyEmailAlert.propTypes = {
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default VerifyEmailAlert;
