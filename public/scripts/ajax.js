$(document).ready(function() {
  // Get form
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      // No more refresh
      event.preventDefault();

      // we serialize the data
      const formData = $form.serialize();

      $.post("/tweets/", formData, function() {
        //function that runs after ajax post sent
        // Clear form
        const inputTextField = $form.find('textarea#tweet-text')
        inputTextField.val("");
        //Reset char to 0
        const counterElement = $form.find('.counter')
        counterElement.text(140);
      });
    });
});