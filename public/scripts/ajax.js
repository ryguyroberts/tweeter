$(document).ready(function() {
  // Get form
  const $form = $('#new-tweet');
    $form.submit(function(event) {
      // No more refresh
      event.preventDefault();

      console.log("We submitted the form");

    });
});