import {getSessionUser, setLoginNavbar} from './lib/session.js';

$(function() {
  // Check login
  const session = getSessionUser();
  if (session) {
    setLoginNavbar();
  }
});
