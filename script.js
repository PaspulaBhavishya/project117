var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()

let predicted_emotion;

$(document).ready(function(){

    //  Fetch the current date and update it in the DOM

    $("#display_date").html(display_date)
})

    //  write an event, when Submit button is clicked
$(function () {
    $('#predict_button').click(function(){
        //  get the text value from the textarea using the 'val()' method
        let input_data = {
            "text": $("#text").val()
        }
        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        
        //  ajax request
        $.ajax({
            //  type of web request
            type : "POST",
            url: "/predict-emotion",
            //  Data to be sent in JSON format
            data : JSON.stringify(input_data),
            //  type of response expected is json
            dataType : "json",
            //  contentType
            contentType : "application/json",
            //  if everything is successful, run this function
            success : function(result){
                // extract prediction and emoticon url from result
                input_text = result.data.predicted_emotion
                emo_url = result.data.predicted_emotion_img_url
                //  update the DOM elements
                $("#prediction").html(predicted_emotion)
                $('#prediction').css("display", "block");

                $("#emo_img_url").attr('src', emo_url);
                $('#emo_img_url').css("display", "block");
                //  show them

            },
            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)
            }
        });
    });
})