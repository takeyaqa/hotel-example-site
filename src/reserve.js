import {formatCurrency, formatDateShort, parseDate, formatDateISO} from './lib/formater.js';
import {getLocale, getAdditionalPlanPrice} from './lib/i18n.js';
import {getSessionUser, getUser, canDisplayPlan, genTransactionId, redirectToTop} from './lib/session.js';
import {resetCustomValidity, setValidityMessage, validateDateInput} from './lib/validation.js';
import {calcTotalBill} from './lib/billing.js';
import {t} from './lib/messages.js';

$(function() {
  // Check login
  const session = getSessionUser();
  const user = getUser(session);

  // Get URL params
  const params = location.search.match(/^\?plan-id=(\d+)$/);
  if (!params || params.length !== 2) {
    redirectToTop();
    return;
  }
  const planId = parseInt(params[1], 10);

  // fetch selected plan data
  const url = location.origin + '/data/' + getLocale() + '/plan_data.json?' + Date.now();
  $.getJSON(url).done(function(data) {
    let plan = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === planId) {
        plan = data[i];
        break;
      }
    }
    if (!plan || !canDisplayPlan(plan, user)) {
      redirectToTop();
      return;
    }
    // set initialize values
    $('#plan-name').text(plan.name);
    $('#plan-desc').text(t('reserve.planDescLong', formatCurrency(plan.roomBill), plan.minHeadCount, plan.maxHeadCount, plan.maxTerm));
    $('#plan-id-hidden').val(plan.id);
    $('#plan-name-hidden').val(plan.name);
    $('#room-bill-hidden').val(plan.roomBill);
    $('#term').attr('min', plan.minTerm)
              .attr('max', plan.maxTerm)
              .val(plan.minTerm);
    $('#head-count').attr('min', plan.minHeadCount)
                    .attr('max', plan.maxHeadCount)
                    .val(plan.minHeadCount);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#date').val(formatDateShort(tomorrow));
    const total = calcTotalBill(plan.roomBill, tomorrow, plan.minTerm, plan.minHeadCount, false, false, false, getAdditionalPlanPrice());
    $('#total-bill').text(formatCurrency(total));
    if (plan.roomPage) {
      $('<iframe></iframe>', {
        'class': 'embed-responsive-item',
        'src': './rooms/' + plan.roomPage,
        'title': t('reserve.roomInfo'),
        'name': 'room',
      }).appendTo('#room-info');
      $('#room-info').addClass('embed-responsive embed-responsive-1by1');
    }
    $('#submit-button').prop('disabled', false);
  });

  // set login user data
  if (user) {
    $('#username').val(user.username);
    $('#email').val(user.email);
    $('#tel').val(user.tel);
  }

  // Setup datepicker
  $('#date').datepicker({
    showButtonPanel: true,
    maxDate: 90,
    minDate: 1,
    onSelect: function() {
      $(this).change();
    },
  });

  // Setup contact select
  $('#contact').change(function() {
    if ($(this).val() === 'no') {
      $('#email').prop('disabled', true)
                 .prop('required', false)
                 .parent().removeClass('d-block').addClass('d-none');
      $('#tel').prop('disabled', true)
               .prop('required', false)
               .parent().removeClass('d-block').addClass('d-none');
    } else if ($(this).val() === 'email') {
      $('#email').prop('disabled', false)
                 .prop('required', true)
                 .parent().removeClass('d-none').addClass('d-block');
      $('#tel').prop('disabled', true)
               .prop('required', false)
               .parent().removeClass('d-block').addClass('d-none');
    } else if ($(this).val() === 'tel') {
      $('#email').prop('disabled', true)
                 .prop('required', false)
                 .parent().removeClass('d-block').addClass('d-none');
      $('#tel').prop('disabled', false)
               .prop('required', true)
               .parent().removeClass('d-none').addClass('d-block');
    }
  });

  // Setup calc total function    
  $('.needs-calc').change(function() {
    resetCustomValidity($(this));
    if ($(this).attr('id') === 'date' && $("#date")[0].checkValidity()) {
      const dateMessage = validateDateInput(parseDate($('#date').val()));
      if (dateMessage) {
        $("#date")[0].setCustomValidity(dateMessage);
      }
    }
    if ($("#date")[0].checkValidity() && $("#term")[0].checkValidity() && $("#head-count")[0].checkValidity()) {
      $("#date").parent().removeClass('was-validated');
      $("#term").parent().removeClass('was-validated');
      $("#head-count").parent().removeClass('was-validated');
      updateTotalBill();
    } else {
      $('#total-bill').text('-');
      setValidityMessage($('.needs-calc'));
      $(this).parent().addClass('was-validated');
    }
  });

  // Setup submit event
  $('#reserve-form').submit(function() {
    resetCustomValidity($(this).find('input'));
    const dateValue = parseDate($('#date').val());
    if ($('#date')[0].checkValidity()) {
      const dateMessage = validateDateInput(dateValue);
      if (dateMessage) {
        $('#date')[0].setCustomValidity(dateMessage);
      }
    }
    if (this.checkValidity()) {
      const reservation = {
        'roomBill': parseInt($('#room-bill-hidden').val(), 10),
        'planName': $('#plan-name-hidden').val(),
        'date': formatDateISO(dateValue),
        'term': parseInt($('#term').val(), 10),
        'headCount': parseInt($('#head-count').val(), 10),
        'breakfast': $('#breakfast').prop('checked'),
        'earlyCheckIn': $('#early-check-in').prop('checked'),
        'sightseeing': $('#sightseeing').prop('checked'),
        'username': $('#username').val(),
        'contact': $('#contact').val(),
        'email': $('#email').val(),
        'tel': $('#tel').val(),
        'comment': $('#comment').val(),
      };
      const transactionId = genTransactionId();
      sessionStorage.setItem(transactionId, JSON.stringify(reservation));
      document.cookie = 'transaction=' + transactionId;
    } else {
      setValidityMessage($(this).find('input'));
      $(this).addClass('was-validated');
      return false;
    }
  });
});

function updateTotalBill() {
  const date = parseDate($('#date').val());
  if (!date) {
    return;
  }
  const roomBill = parseInt($('#room-bill-hidden').val(), 10);
  const term = parseInt($('#term').val(), 10);
  const headCount = parseInt($('#head-count').val(), 10);
  const totalBill = calcTotalBill(
      roomBill,
      date,
      term, 
      headCount,
      $('#breakfast').prop('checked'),
      $('#early-check-in').prop('checked'),
      $('#sightseeing').prop('checked'),
      getAdditionalPlanPrice()
  );
  $('#total-bill').text(formatCurrency(totalBill));
}
