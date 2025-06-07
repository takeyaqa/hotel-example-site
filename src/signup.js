import {getUser, getSessionUser, login, redirectToTop} from './lib/session.js';
import {resetCustomValidity, setValidityMessage} from './lib/validation.js';
import {t} from './lib/messages.js';

const session = getSessionUser();
if (session) {
  redirectToTop();
}
$(function() {
  // Setup submit event
  $('#signup-form').submit(function() {
    resetCustomValidity($(this).find('input'));

    // Check exsists user
    if ($('#email')[0].checkValidity()) {
      const user = getUser($('#email').val());
      if (user) {
        $('#email')[0].setCustomValidity(t('validation.existsMail'));
      }
    }

    // Check password
    if ($('#password')[0].checkValidity() && $('#password-confirmation')[0].checkValidity()) {
      if ($('#password').val() !== $('#password-confirmation').val()) {
        $('#password-confirmation')[0].setCustomValidity(t('validation.passwordUnmatch'));
      }
    }

    // Submit or error
    if (this.checkValidity()) {
      const newUser = {
        'email': $('#email').val(),
        'password': $('#password').val(),
        'username': $('#username').val(),
        'rank': $('input[name="rank"]:checked').val(),
        'address': $('#address').val(),
        'tel': $('#tel').val(),
        'gender': $('#gender').val(),
        'birthday': $('#birthday').val(),
        'notification': $('#notification').prop('checked'),
      };

      // store user data
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      login(newUser.email);
    } else {
      setValidityMessage($(this).find('input'));
      $(this).addClass('was-validated');
      return false;
    }
  });
});
