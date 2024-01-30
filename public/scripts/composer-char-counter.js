// When DOM is ready
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    // Var for counter object, Travel the DOM! Find counter
    const counterElement = $(this).closest('form').find('.counter');

    // Length of textbox value
    let inputLength = $(this).val().length;

    // Shows negative if over char count or back to default and sets red
    if (inputLength > 140) {
      inputLength = ((inputLength - 140) * -1);
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', '');
    }
    // Set text
    counterElement.text(inputLength);
  })

});
