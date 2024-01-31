$(document).ready(function() {
  // Get form
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      // No more refresh
      event.preventDefault();

      console.log("We submitted the form");
      // we serialize the data
      const formData = $form.serialize();

      $.post("/tweets/", formData, function() {
        //function that runs after ajax post sent
        const inputTextField = $form.find('textarea#tweet-text')
        inputTextField.val("");
      });
    });
});