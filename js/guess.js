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

    //Get the player's guess and remove it from view
    var playerGuess = $('#guess').val();
    $('#guess').val('');

    guessCount += 1;
    //Notify if the player has won, lost, and to try again.
    if (guessCount < 5) {
      $('#titleCount').html('Guess ['+guessCount+']');
      $('#titleCounth2').html('Try Again!');
      if (playerGuess == theWinningNumber) {
        $('#titleCount').html('Correct!');
        $('#titleCounth2').html('But what\'s the question?');
      }
    } else {
      $('#titleCount').html('Too Many Guesses');
      $('#titleCounth2').html('Existential Crisis');
    }
    //Determines if the player is close - within +- 10, and to try again if they still have guesses left.
    var lowerOrHigher = function(guess, win) {
      var diff = guess - win;
      if (diff==0) {
        return 'match';
      } else if (diff < 0) {
        return 'lower';
      } else if (diff > 0) {
        return 'higher';
      }
    };

    var guessMessage = function(guess, win) {
      var diff = guess - win;
      if (lowerOrHigher(guess, win) == 'match') {
        return "The Truth is Known!";
      } else if ((lowerOrHigher(guess, win) == 'lower') && Math.abs(diff) < 5) {
        return 'You\'re below and only 5 numbers away!';
      } else if ((lowerOrHigher(guess, win) == 'higher') && Math.abs(diff) < 5) {
        return 'You\'re above and only 5 numbers away!';
      } else if (lowerOrHigher(guess, win) == 'lower') {
        return 'You\'re below!';
      } else if (lowerOrHigher(guess, win) == 'higher') {
        return "You\'re above!";
      }
    };


    $('#hotOrCold').html(guessMessage(playerGuess, theWinningNumber));


    console.log('target: ' + theWinningNumber);
    console.log('guess: ' + playerGuess);
    console.log('count: ' + guessCount);

  });

});
