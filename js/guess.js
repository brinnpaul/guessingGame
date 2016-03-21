// fiddled around with parameters until the entire background was covered by background
// image. #note - should figure out how to implement same solution in CSS?

$('.contentContainer').height(
    $(window).height() - .8*$('.navbar').height()
);

$(document).ready(function() {

  // Sets the value of which the user is trying to guess and initializes the guess counter.

  function generateWinningNumber() {
    return Math.floor(Math.random() * 100);
  }

  var theWinningNumber = generateWinningNumber();

  var guessCount = 0;

  // Reload page.

  $('#newGame').on('click', function() {
    window.location.reload();
  });

  // Logic for the hint button.

  $('#hint').on('click', function(e) {
    e.preventDefault();

    $('#titleCount').html('The answer may be ' +theWinningNumber+',');
    $('#titleCounth2').html('But what\'s the question?');
  })

  // Logic for the guess button. Grabs guess from form input and determines if
  // guess is correct, close or not. Button also dynamically updates the title,
  // displaying how many guesses have been made as well as displaying whether
  // the user has won or lost the game.

  $('#submitGuess').on('click', function(e) {
    e.preventDefault();

    var playerGuess = $('#guess').val();
    $('#guess').val('');

    guessCount += 1;

    if (guessCount < 5) {
      $('#titleCount').html('Guess ['+guessCount+']');
      if (playerGuess == theWinningNumber) {
        $('#titleCount').html('Correct!');
        $('#titleCounth2').html('But what\'s the question?');
      }
    } else {
      $('#titleCount').html('Too Many Guesses');
      $('#titleCounth2').html('Existential Crisis');
    }

    var hotOrCold = function(guess) {
      if (playerGuess == theWinningNumber) {
        return null;
      } else if (Math.abs(playerGuess - theWinningNumber) < 10) {
        return 'You\'re getting somewhere!';
      } else {
        return "You know nothing, Jon Snow!";
      }

    };

    $('#hotOrCold').html(hotOrCold(playerGuess));


    console.log('target: ' + theWinningNumber);
    console.log('guess: ' + playerGuess);
    console.log('count: ' + guessCount);

  });

});
