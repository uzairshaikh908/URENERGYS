setTimeout(function () {
    console.log("Klaviyo is Ready");
  
    function triggerKlaviyo(message, item, email) {
      var email = email;
      var productName = item.data("type") !== undefined ? item.data("type") : "";
      var imageURL = item.data("kimage") !== undefined ? "https://maximumsupplementsformen.com" + item.data("kimage") : "";
      var value = item.data("amount") !== undefined ? item.data("amount") : "";
      var page = $("#klaviyo_page").val();
      var message = message;
      var xhr = new XMLHttpRequest();
      var url =
        "/site/call-klaviyo?email=" +
        encodeURIComponent(email) +
        "&product_name=" +
        encodeURIComponent(productName) +
        "&product_image=" +
        encodeURIComponent(imageURL) +
        "&product_price=" +
        encodeURIComponent(value) +
        "&klaviyo_page=" +
        encodeURIComponent(page) +
        "&message=" +
        encodeURIComponent(message);
  
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
      };
      xhr.send();
    }
  
    $("[name='product_id']").on("change", function () {
      triggerKlaviyo("Changed Product", $("[name='product_id']:checked"), $("#orderform-email").val());
    });
  
    $("[name='p']").on("change", function () {
      triggerKlaviyo("Changed Product", $("[name='p']:checked"), '');
    });
  
    $(".first_step_button").on("click", function () {
      triggerKlaviyo("Continue To Step Two", $("[name='product_id']:checked"), $("#orderform-email").val());
    });
  
    $("#submitBtn").on("click", function () {
      triggerKlaviyo("Completed Order Form", $("[name='product_id']:checked"), $("#orderform-email").val());
    });
    
  }, 3000);
  