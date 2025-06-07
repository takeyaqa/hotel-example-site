import {getUser, getSessionUser, logout, redirectToTop} from './lib/session.js';
import {setValidityMessage} from './lib/validation.js';
import {t} from './lib/messages.js';

const session = getSessionUser();

if (!session) {
  redirectToTop();
}

// load user data
const user = getUser(session);

if (user.preset) {
  redirectToTop();
}

$(function() {
  // set file event
  $('#icon').change(function() {
    this.setCustomValidity('');
    const file = this.files[0];
    $('#color').val('#ffffff');
    $('#zoom').val(100);
    if (!file) {
      $('#icon-holder').empty();
      $('#zoom').prop('disabled', true);
      $('#color').prop('disabled', true);
      return;
    } else if (file.size > (10 * 1024)) {
      $('#icon-holder').empty();
      $('#zoom').prop('disabled', true);
      $('#color').prop('disabled', true);
      this.setCustomValidity(t('validation.underTenKb'));
      setValidityMessage($(this));
      $('#icon-form').addClass('was-validated');
      return;
    } else if (!/^image\/.+$/.test(file.type)) {
      $('#icon-holder').empty();
      $('#zoom').prop('disabled', true);
      $('#color').prop('disabled', true);
      this.setCustomValidity(t('validation.onlyImageFile'));
      setValidityMessage($(this));
      $('#icon-form').addClass('was-validated');
      return;
    }
    $('<img>', {
      'id': 'icon-img',
      'class': 'img-thumbnail',
      'src': URL.createObjectURL(file),
      'width': 100,
      'height': 100,
      'on': {
        'load': function() {
          URL.revokeObjectURL(this.src);
        },
      },
    }).appendTo('#icon-holder');

    // set zoom input
    $('#zoom').prop('disabled', false);
    $('#zoom').change(function() {
      $('#icon-img').width(parseInt($(this).val(), 10))
                    .height(parseInt($(this).val(), 10));
    });

    // set color input
    $('#color').prop('disabled', false);
    $('#color').change(function() {
      $('#icon-img').css('backgroundColor', $(this).val());
    });
  });

  $('#icon-form').submit(function() {
    if (this.checkValidity()) {
      const file = $('#icon').prop('files')[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        user.icon = {
          'image': event.target.result,
          'width': parseInt($('#zoom').val(), 10),
          'height': parseInt($('#zoom').val(), 10),
          'color': $('#color').val(),
        };
        localStorage.setItem(user.email, JSON.stringify(user));
      };
      
      reader.readAsDataURL(file);
    } else {
      setValidityMessage($('#icon'));
      $(this).addClass('was-validated');
      return false;
    }
  });

  $('#logout-form').submit(function() {
    logout();
  });
});
