$(document).foundation();

var page = $('[id$="Page"]').attr('id').slice(0,-4);

$('.' + page + 'Nav').addClass('active');

if (page == 'home') {
  document.querySelector('[data-slide]').setAttribute('data-slide', Math.floor(Math.random()*4+1));
} else if (page == 'contribute') {
  if (window.location.hash == '#openings') {
    $(document).ready(function(){
      $('#openingsModal').foundation('reveal', 'open', '/modals/openings.html');
    });
  }
} else if (page == 'people') {
  var i = 150,
      faces = $('<ul>');
  while (i--) {
    faces.append('<li data-tooltip title="Bob Loblaw<br>Mechanical Engineering<br>2016"><img src="http://placehold.it/60x60/' + Math.floor(Math.random()*16777215).toString(16) + '&text=Photo" alt=""></li>');
  }
  $('#faces').append(faces);
  $(document).foundation('tooltip');
}