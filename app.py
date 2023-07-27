from flask import Flask, render_template, url_for, request, jsonify
from sentiment_analysis import *

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/emotion' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get("text")

    # check if the customer_review is empty, return error
    if not review:

        return jsonify({'status' : 'error' , 
                        'message' : 'Empty response'})

        # if review is not empty, pass it through the 'predict' function.
        # predict function returns 2 things : sentiment and path of image in static folder
        # example : Positive , ./static/assets/emoticons/positive.png
    else:
        predicted_emotion,predicted_emotion_img_url = predict(review)
        
        response = {
                    "status": "success",
                    "data": {
                            "predicted_emotion": predicted_emotion,
                            "predicted_emotion_img_url": predicted_emotion_img_url
                            }  
                   }
    
    return jsonify(review)

app.run(debug = True)