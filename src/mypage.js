import {formatDateLong, parseDateISO} from './lib/formater.js';
import {getUser, getSessionUser, logout, redirectToTop} from './lib/session.js';
import {t} from './lib/messages.js';

const DISPLAY_GENDER = {
  '0': t('user.gender.unregistered'),
  '1': t('user.gender.male'),
  '2': t('user.gender.female'),
  '9': t('user.gender.other'),
};

history.replaceState(null, '', 'mypage.html');
const session = getSessionUser();
if (!session) {
  redirectToTop();
}
$(function() {
  // load user data
  const user = getUser(session);
  if (!user) {
    return;
  }

  // set user data
  $('#email').text(user.email);
  $('#username').text(user.username);
  if (user.rank === 'premium') {
    $('#rank').text(t('user.rank.premium'));
  } else if (user.rank === 'normal') {
    $('#rank').text(t('user.rank.normal'));
  }
  $('#address').text(user.address ? user.address : t('user.unregistered'));
  $('#tel').text(user.tel ? user.tel : t('user.unregistered'));
  $('#gender').text(DISPLAY_GENDER[user.gender]);
  $('#birthday').text(user.birthday ? formatDateLong(parseDateISO(user.birthday)) : t('user.unregistered'));
  $('#notification').text(user.notification ? t('user.notification.true') : t('user.notification.false'));

  // set icon
  if (user.icon) {
    $('<img>', {
      'class': 'img-thumbnail',
      'src': user.icon.image,
      'width': user.icon.width,
      'height': user.icon.height,
      'css': {
        'backgroundColor': user.icon.color,
      },
    }).appendTo('#icon-holder');
  }

  $('#logout-form').submit(function() {
    logout();
  });

  if (!user.preset) {
    $('#icon-link').removeClass('disabled').removeAttr('tabindex').removeAttr('aria-disabled')
    $('#delete-form > button').prop('disabled', false);
    $('#delete-form').submit(function() {
      if (confirm(t('user.deleteConfirm'))) {
        logout();
        localStorage.removeItem(user.email);
        alert(t('user.deleteComplete'));
      } else {
        return false;
      }
    });
  }
});
