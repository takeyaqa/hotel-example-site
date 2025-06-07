import {formatCurrency} from './lib/formater.js';
import {getLocale} from './lib/i18n.js';
import {getSessionUser, getUser, setLoginNavbar, canDisplayPlan} from './lib/session.js';
import {t} from './lib/messages.js';

$(function() {
  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
  const user = getUser(session);

  // fetch plan data
  const url = location.origin + '/data/' + getLocale() + '/plan_data.json?' + Date.now();
  $.getJSON(url).done(function(data) {
    let planHtml = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== 0 && canDisplayPlan(data[i], user)) {
        planHtml += genPlanHtml(data[i]);
      }
    }
    $('#plan-list').html(planHtml);
  });
});

/**
 * Generate plan HTML
 * @param {onject} plan plan data
 * @return {string} plan HTML
 */
function genPlanHtml(plan) {
  let header = '';
  if (plan.only === 'premium') {
    header = '<div class="card-header">' + t('plans.premiumOnly') + '</div>';
  } else if (plan.only === 'member') {
    header = '<div class="card-header">' + t('plans.memberOnly') + '</div>';
  }
  return '<div class="col-12 col-md-6 col-lg-4">' +
'<div class="card text-center shadow-sm mb-3">' + 
  header + 
  '<div class="card-body">' +
    '<h5 class="card-title">' + plan.name + '</h5>' +
      '<ul class="list-unstyled">' +
        '<li>' + t('plans.oneAdult', formatCurrency(plan.roomBill)) + '</li>' +
        '<li>' + t('plans.minHeadCount', plan.minHeadCount) + '</li>' +
        '<li>' + plan.room + '</li>' +
      '</ul>' +
      '<a href="./reserve.html?plan-id=' + plan.id + '" class="btn btn-primary" target="_blank" rel="opener">' + t('plans.reserveLink') + '</a>' +
    '</div>' +
  '</div>' +
'</div>';
}
