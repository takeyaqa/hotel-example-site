import {formatCurrency, formatDateLong, parseDateISO} from './lib/formater.js';
import {getAdditionalPlanPrice} from './lib/i18n.js';
import {getTransactionId, deleteTransactionId, redirectToTop} from './lib/session.js';
import {calcTotalBill} from './lib/billing.js';
import {t} from './lib/messages.js';

history.replaceState(null, '', 'confirm.html');

$(function() {
  // load data
  const transactionId = getTransactionId();
  if (!transactionId) {
    redirectToTop();
    return;
  }
  const data = sessionStorage.getItem(transactionId);
  if (!data) {
    redirectToTop();
    return;
  }
  const reservation = JSON.parse(data);
  deleteTransactionId();
  sessionStorage.removeItem(transactionId);

  // create contents
  const reserveDate = parseDateISO(reservation.date);
  const endDate = new Date(reserveDate.getFullYear(), reserveDate.getMonth(), reserveDate.getDate() + reservation.term);
  const totalBill = calcTotalBill(reservation.roomBill, reserveDate, reservation.term,
      reservation.headCount, reservation.breakfast, reservation.earlyCheckIn, reservation.sightseeing, getAdditionalPlanPrice());

  // set result
  $('#total-bill').text(t('reserve.totalBill', formatCurrency(totalBill)));
  $('#plan-name').text(reservation.planName);
  $('#plan-desc').text(t('reserve.planDescShort', formatCurrency(reservation.roomBill)));
  $('#term').text(t('reserve.term', formatDateLong(reserveDate), formatDateLong(endDate), reservation.term));
  $('#head-count').text(t('reserve.headCount', reservation.headCount));
  let plansHtml = '';
  if (reservation.breakfast) {
    plansHtml += '<li>' + t('reserve.breakfast') + '</li>';
  }
  if (reservation.earlyCheckIn) {
    plansHtml += '<li>' + t('reserve.earlyCheckIn') + '</li>';
  }
  if (reservation.sightseeing) {
    plansHtml += '<li>' + t('reserve.sightseeing') + '</li>';
  }
  if (plansHtml.length > 0) {
    plansHtml = '<ul>' + plansHtml + '</ul>';
  } else {
    plansHtml = t('reserve.none');
  }
  $('#plans').html(plansHtml);
  $('#username').text(t('reserve.username', reservation.username));
  let contactText = '';
  if (reservation.contact === 'no') {
    contactText += t('reserve.contact.no');
  } else if (reservation.contact === 'email') {
    contactText += t('reserve.contact.email', reservation.email);
  } else if (reservation.contact === 'tel') {
    contactText += t('reserve.contact.tel', reservation.tel);
  }
  $('#contact').text(contactText);
  $('#comment').text(reservation.comment ? reservation.comment : t('reserve.none'));

  $('#success-modal').on('hidden.bs.modal', function() {
    window.close();
  });
});
