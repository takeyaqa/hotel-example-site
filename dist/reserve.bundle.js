(()=>{"use strict";var e={611:e=>{e.exports=JSON.parse('{"validation":{"valueMissing":"Please fill out this field.","typeMismatch":{"email":"Please enter a non-empty email address.","url":"Please enter a non-empty URL."},"badInput":"Please enter a valid value.","patternMismatch":"Please match the requested format.","tooLong":"Please shorten this text to {} characters or less.","tooShort":"Please lengthen this text to {} characters or more.","rangeOverflow":"Value must be less than or equal to {}.","rangeUnderflow":"Value must be greater than or equal to {}.","stepMismatch":"Please enter a valid value.","shoudBeNextDay":"Please enter a date after tomorrow.","shouldBeThreeMonth":"Please enter a date within 3 months.","mailOrAddressMismatch":"Email or password is invalid.","existsMail":"Email has already been taken.","passwordUnmatch":"Password doesn\'t match.","underTenKb":"Please select a file with a size of 10 KB or less.","onlyImageFile":"Please select an image file."},"user":{"gender":{"unregistered":"not answered","male":"male","female":"female","other":"other"},"rank":{"premium":"Premium","normal":"Normal"},"unregistered":"not answered","notification":{"true":"received","false":"not received"},"deleteConfirm":"If you cancel your membership, all information will be deleted.\\nDo you wish to proceed?","deleteComplete":"The process has been completed. Thank you for your service."},"plans":{"premiumOnly":"❤️Premium members ONLY❤️","memberOnly":"members ONLY","oneAdult":"{} per guest","minHeadCount":"at least {} person(s)","reserveLink":"Reserve room"},"reserve":{"planDescLong":"{} per night. If contains Sun or Sat, plus 25%. {} - {} persons. Max {} nights","planDescShort":"{} per night. If contains Sun or Sat, plus 25%.","roomInfo":"Room info","totalBill":"Total {} (included taxes)","term":"{} - {}. {} night(s)","headCount":"{} person(s)","breakfast":"Breakfast","earlyCheckIn":"Early check-in","sightseeing":"Sightseeing","none":"none","username":"{}","contact":{"no":"not required","email":"Email: {}","tel":"Tel: {}"}}}')},63:e=>{e.exports=JSON.parse('[{"email":"clark@example.com","password":"password","username":"Clark Evans","rank":"premium","address":"Mountain View, California","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"diana@example.com","password":"pass1234","username":"Diana Johansson","rank":"normal","address":"Redmond, Washington","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"ororo@example.com","password":"pa55w0rd!","username":"Ororo Saldana","rank":"premium","address":"Cupertino, California","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"miles@example.com","password":"pass-pass","username":"Miles Boseman","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')},182:e=>{e.exports=JSON.parse('{"validation":{"valueMissing":"このフィールドを入力してください。","typeMismatch":{"email":"メールアドレスを入力してください。","url":"URLを入力してください。"},"badInput":"有効な値を入力してください。","patternMismatch":"指定されている形式で入力してください。","tooLong":"{}文字以内で入力してください。","tooShort":"{}文字以上で入力してください。","rangeOverflow":"{}以下の値を入力してください。","rangeUnderflow":"{}以上の値を入力してください。","stepMismatch":"有効な値を入力してください。","shoudBeNextDay":"翌日以降の日付を入力してください。","shouldBeThreeMonth":"3ヶ月以内の日付を入力してください。","mailOrAddressMismatch":"メールアドレスまたはパスワードが違います。","existsMail":"このメールアドレスはすでに登録済みです。","passwordUnmatch":"入力されたパスワードと一致しません。","underTenKb":"ファイルサイズは10KB以下にしてください。","onlyImageFile":"画像ファイルを選択してください。"},"user":{"gender":{"unregistered":"未登録","male":"男性","female":"女性","other":"その他"},"rank":{"premium":"プレミアム会員","normal":"一般会員"},"unregistered":"未登録","notification":{"true":"受け取る","false":"受け取らない"},"deleteConfirm":"退会すると全ての情報が削除されます。\\nよろしいですか？","deleteComplete":"退会処理を完了しました。ご利用ありがとうございました。"},"plans":{"premiumOnly":"❤️プレミアム会員限定❤️","memberOnly":"会員限定","oneAdult":"大人1名{}","minHeadCount":"{}名様から","reserveLink":"このプランで予約"},"reserve":{"planDescLong":"お一人様1泊{}〜、土日は25%アップ。{}名様〜{}名様、最長{}泊","planDescShort":"お一人様1泊{}〜、土日は25%アップ","roomInfo":"部屋情報","totalBill":"合計 {}（税込み）","term":"{} 〜 {} {}泊","headCount":"{}名様","breakfast":"朝食バイキング","earlyCheckIn":"昼からチェックインプラン","sightseeing":"お得な観光プラン","none":"なし","username":"{}様","contact":{"no":"希望しない","email":"メール：{}","tel":"電話：{}"}}}')},864:e=>{e.exports=JSON.parse('[{"email":"ichiro@example.com","password":"password","username":"山田一郎","rank":"premium","address":"東京都豊島区池袋","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"sakura@example.com","password":"pass1234","username":"松本さくら","rank":"normal","address":"神奈川県横浜市鶴見区大黒ふ頭","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"jun@example.com","password":"pa55w0rd!","username":"林潤","rank":"premium","address":"大阪府大阪市北区梅田","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"yoshiki@example.com","password":"pass-pass","username":"木村良樹","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')}},a={};function t(n){var r=a[n];if(void 0!==r)return r.exports;var o=a[n]={exports:{}};return e[n](o,o.exports,t),o.exports}const n={ja:t(182),"en-US":t(611)},r={ja:t(864),"en-US":t(63)},o={ja:new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",currencyDisplay:"name"}),"en-US":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",currencyDisplay:"symbol"})},i=(new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}),new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}),{ja:function(e){return e.getFullYear()+"/"+c(e.getMonth()+1)+"/"+c(e.getDate())},"en-US":function(e){return c(e.getMonth()+1)+"/"+c(e.getDate())+"/"+e.getFullYear()}}),l={ja:function(e){const a=e.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);if(!a||4!==a.length)return null;const t=parseInt(a[1],10),n=parseInt(a[2],10),r=parseInt(a[3],10);return new Date(t,n-1,r)},"en-US":function(e){const a=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(!a||4!==a.length)return null;const t=parseInt(a[3],10),n=parseInt(a[1],10),r=parseInt(a[2],10);return new Date(t,n-1,r)}},s={ja:1e3,"en-US":10};function d(){return $("html").attr("lang")}function m(e){return e=void 0!==e?e:d(),s[e]}function c(e){return e<10?"0"+e:""+e}function u(e){return(a=void 0!==a?a:d(),o[a]).format(e);var a}function p(e){var a;return(a=void 0!==a?a:d(),l[a])(e)}function h(e){return e<10?"0"+e:""+e}function v(){let e;e=2===location.pathname.split("/").length?location.pathname.replace(/(\/.+\.html)/,"/index.html"):location.pathname.replace(/(\/.+)(\/.+\.html)/,"$1/index.html"),location.assign(location.origin+e)}function f(){const e=Array.prototype.slice.call(arguments),a=e.shift();let t=(r=void 0!==r?r:d(),n[r]);var r;const o=a.split(".");let i;for(let e=0;e<o.length&&(i=t[o[e]],"string"!=typeof i);e++)t=t[o[e]];for(let a=0;a<e.length;a++)i=i.replace("{}",e[a]);return i}function g(e){e.each((function(){this.setCustomValidity("")}))}function y(e){e.each((function(){var e;$(this).nextAll(".invalid-feedback").text((e=this).validity.customError?e.validationMessage:e.validity.valueMissing?f("validation.valueMissing"):e.validity.typeMismatch?"email"===e.type?f("validation.typeMismatch.email"):"url"===e.type?f("validation.typeMismatch.url"):f("validation.badInput"):e.validity.tooLong?f("validation.tooLong",e.maxLength):e.validity.tooShort?f("validation.tooShort",e.minLength):e.validity.rangeOverflow?f("validation.rangeOverflow",e.max):e.validity.rangeUnderflow?f("validation.rangeUnderflow",e.min):e.validity.stepMismatch||e.validity.badInput?f("validation.badInput"):e.validity.patternMismatch?f("validation.patternMismatch"):void 0)}))}function b(e){if(!e)return f("validation.badInput");{const a=new Date,t=new Date;if(t.setDate(t.getDate()+90),e.getTime()<a.getTime())return f("validation.shoudBeNextDay");if(e.getTime()>t.getTime())return f("validation.shouldBeThreeMonth")}}function k(e,a,t,n,r,o,i,l){let s=e*n*t;for(let r=0;r<t;r++){const t=new Date(a.getFullYear(),a.getMonth(),a.getDate());t.setDate(t.getDate()+r),0!==t.getDay()&&6!==t.getDay()||(s+=.25*e*n)}return r&&(s+=l*n*t),o&&(s+=l*n),i&&(s+=l*n),s}$((function(){const e=function(e){const a=(t=void 0!==t?t:d(),r[t]);var t;let n=null;for(let t=0;t<a.length;t++)if(a[t].email===e){n=a[t];break}return n?(n.preset=!0,n):(n=localStorage.getItem(e),n?JSON.parse(n):null)}(document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/,"$1")),a=location.search.match(/^\?plan-id=(\d+)$/);if(!a||2!==a.length)return void v();const t=parseInt(a[1],10),n=location.origin+"/data/"+d()+"/plan_data.json?"+Date.now();$.getJSON(n).done((function(a){let n=null;for(let e=0;e<a.length;e++)if(a[e].id===t){n=a[e];break}if(!n||!function(e,a){return!e.only||!!a&&("member"===e.only||("premium"===e.only?"premium"===a.rank:void 0))}(n,e))return void v();$("#plan-name").text(n.name),$("#plan-desc").text(f("reserve.planDescLong",u(n.roomBill),n.minHeadCount,n.maxHeadCount,n.maxTerm)),$("#plan-id-hidden").val(n.id),$("#plan-name-hidden").val(n.name),$("#room-bill-hidden").val(n.roomBill),$("#term").attr("min",n.minTerm).attr("max",n.maxTerm).val(n.minTerm),$("#head-count").attr("min",n.minHeadCount).attr("max",n.maxHeadCount).val(n.minHeadCount);const r=new Date;var o,l;r.setDate(r.getDate()+1),$("#date").val((o=r,(l=void 0!==l?l:d(),i[l])(o)));const s=k(n.roomBill,r,n.minTerm,n.minHeadCount,!1,!1,!1,m());$("#total-bill").text(u(s)),n.roomPage&&($("<iframe></iframe>",{class:"embed-responsive-item",src:"./rooms/"+n.roomPage,title:f("reserve.roomInfo"),name:"room"}).appendTo("#room-info"),$("#room-info").addClass("embed-responsive embed-responsive-1by1")),$("#submit-button").prop("disabled",!1)})),e&&($("#username").val(e.username),$("#email").val(e.email),$("#tel").val(e.tel)),$("#date").datepicker({showButtonPanel:!0,maxDate:90,minDate:1,onSelect:function(){$(this).change()}}),$("#contact").change((function(){"no"===$(this).val()?($("#email").prop("disabled",!0).prop("required",!1).parent().removeClass("d-block").addClass("d-none"),$("#tel").prop("disabled",!0).prop("required",!1).parent().removeClass("d-block").addClass("d-none")):"email"===$(this).val()?($("#email").prop("disabled",!1).prop("required",!0).parent().removeClass("d-none").addClass("d-block"),$("#tel").prop("disabled",!0).prop("required",!1).parent().removeClass("d-block").addClass("d-none")):"tel"===$(this).val()&&($("#email").prop("disabled",!0).prop("required",!1).parent().removeClass("d-block").addClass("d-none"),$("#tel").prop("disabled",!1).prop("required",!0).parent().removeClass("d-none").addClass("d-block"))})),$(".needs-calc").change((function(){if(g($(this)),"date"===$(this).attr("id")&&$("#date")[0].checkValidity()){const e=b(p($("#date").val()));e&&$("#date")[0].setCustomValidity(e)}$("#date")[0].checkValidity()&&$("#term")[0].checkValidity()&&$("#head-count")[0].checkValidity()?($("#date").parent().removeClass("was-validated"),$("#term").parent().removeClass("was-validated"),$("#head-count").parent().removeClass("was-validated"),function(){const e=p($("#date").val());if(!e)return;const a=k(parseInt($("#room-bill-hidden").val(),10),e,parseInt($("#term").val(),10),parseInt($("#head-count").val(),10),$("#breakfast").prop("checked"),$("#early-check-in").prop("checked"),$("#sightseeing").prop("checked"),m());$("#total-bill").text(u(a))}()):($("#total-bill").text("-"),y($(".needs-calc")),$(this).parent().addClass("was-validated"))})),$("#reserve-form").submit((function(){g($(this).find("input"));const e=p($("#date").val());if($("#date")[0].checkValidity()){const a=b(e);a&&$("#date")[0].setCustomValidity(a)}if(!this.checkValidity())return y($(this).find("input")),$(this).addClass("was-validated"),!1;{const t={roomBill:parseInt($("#room-bill-hidden").val(),10),planName:$("#plan-name-hidden").val(),date:(a=e,a.getFullYear()+"-"+h(a.getMonth()+1)+"-"+h(a.getDate())),term:parseInt($("#term").val(),10),headCount:parseInt($("#head-count").val(),10),breakfast:$("#breakfast").prop("checked"),earlyCheckIn:$("#early-check-in").prop("checked"),sightseeing:$("#sightseeing").prop("checked"),username:$("#username").val(),contact:$("#contact").val(),email:$("#email").val(),tel:$("#tel").val(),comment:$("#comment").val()},n=""+(Math.floor(9e9*Math.random())+1e9);sessionStorage.setItem(n,JSON.stringify(t)),document.cookie="transaction="+n}var a}))}))})();
//# sourceMappingURL=reserve.bundle.js.map