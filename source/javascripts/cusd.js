//= require jquery/dist/jquery.js
//= require Snap.svg/dist/snap.svg.js

var roles = ['architects','designers','engineers','strategists'],
    s = Snap('#teamGraphic'),
    i = 0;

var animateTeamGraphic = function(fromId, toId, duration) {
  s.select(toId).animate({fill: '#3F9B8F'}, duration);
  s.select(fromId).animate({fill: '#81C36C'}, duration);
};

var animateRoleText = function(newText) {
  $('#roleLabel').animate({opacity:0}, 750, function() {
    $(this).text(newText).animate({opacity:1}, 750);
  });
};

var switchRole = function() {
  var fromRole = roles[i],
      toRole = roles[(++i % roles.length)];
      
  i = i % roles.length;
  animateRoleText(toRole.slice(0,1).toUpperCase() + toRole.slice(1));
  animateTeamGraphic('#' + fromRole, '#' + toRole, 1500);
};

$(document).ready(function(){
  if ($("body.index").length === 1) {
    window.setTimeout(function() {
      switchRole();
      window.setInterval(switchRole, 4000);
    }, 1000);
  }
});