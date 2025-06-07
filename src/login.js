import {isValidUser, getSessionUser, login, redirectToTop} from './lib/session.js';
import {resetCustomValidity, setValidityMessage} from './lib/validation.js';
import {t} from './lib/messages.js';

const session = getSessionUser();
if (session) {
  redirectToTop();
}
$(function() {
  // Setup submit event
  $('#login-form').submit(function() {
    resetCustomValidity($(this).find('input'));

    // Check user
    if ($('#email')[0].checkValidity() && $('#password')[0].checkValidity()) {
      if (!isValidUser($('#email').val(), $('#password').val())) {
        $('#email')[0].setCustomValidity(t('validation.mailOrAddressMismatch'));
        $('#password')[0].setCustomValidity(t('validation.mailOrAddressMismatch'));
      }
    }

    // submit or error
    if (this.checkValidity()) {
      login($('#email').val());
    } else {
      setValidityMessage($(this).find('input'));
      $(this).addClass('was-validated');
      return false;
    }
  });
});
