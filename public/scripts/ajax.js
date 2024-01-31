$(document).ready(function() {
  // Get form
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      const inputTextField = $form.find('textarea#tweet-text')
      //input empty or over 140
      if (inputTextField.val() === "" || inputTextField.val().length > 140) {
        event.preventDefault();
        alert("Tweet cannot be empty, or over 140 Chars!")
      } else {
        // No more refresh
        event.preventDefault();
        const formData = $form.serialize();

        $.post("/tweets/", formData, function() {
          //function that runs after ajax post sent
          // Clear form
          const inputTextField = $form.find('textarea#tweet-text')
          inputTextField.val("");
          //Reset char to 0
          const counterElement = $form.find('.counter')
          counterElement.text(0);
        });
      }
    });
});