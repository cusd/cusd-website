$(document).foundation();

var page = $('[id$="Page"]').attr('id').slice(0,-4);

$('#' + page + 'Nav').addClass('active');

if (page == 'home') {
  document.querySelector('[data-slide]').setAttribute('data-slide', Math.floor(Math.random()*4+1));
}