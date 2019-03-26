from flask import Flask, jsonify
from search_engine import Search_engine
from subprocess import Popen, PIPE
import subprocess
import shlex
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
engine = Search_engine()


@app.route('/')
def home():
    return "hello world"

# search a movie by title
# GET /search/term=<string: title>
@app.route('/search/term=<string:title>')
def search_by_title(title):
    new_title = title[0:len(title)]
    title = new_title
    return jsonify(engine.search_by_title(title))


# get the Details result about a movie
# GET /result_id=<string:id>
@app.route("/result_id=<string:id>")
def basic_movie_info(id):

    new_id = id[0:len(id)-0]
    id = new_id

    return jsonify(engine.get_movie(id))


# get the platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/title=<string:title>&date=<string:date>")
def getPlatforms(title, date):
    return "all"
    pass


# get the Itunes platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/itunes/title=<string:title>&date=<string:date>")
def getItunes(title, date):
    # print(title[1:len(title)-1])
    return jsonify(engine.get_Itunes(title, date))


# get the google platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/google_play/title=<string:title>&date=<string:date>")
def getGoogle(title, date):
    # print(title[1:len(title)-1])
    # print("here")
    return jsonify(engine.get_googlePlay(title, date))

# get the youtobe price
# format: movie_title year
@app.route("/price/title=<string:title>&date=<string:year>")
def getYoutobePrice(title, year):

    # running the shell scrip to web scrap the youtobe price
    p =  Popen(['./webscraping/youtobe_price.sh', title, year], stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(b"input data that is passed to subprocess' stdin")
    rc = p.returncode

    # split the output line by line
    info_list = output.splitlines()

    # get the price
    price = info_list[0].decode('ascii')

    #check if the price is in correct format
    if not price.startswith("$"):
        return jsonify({"result": "not found"})
    
    # get the link 
    link = info_list[1].decode('ascii')

    # print the price and link (for testing)
    print (price)
    print (link)

    # making json object
    data = {"movie_title": title, "year": year, "youtobe_price": price, "youtobe_link": link}

    json_data = json.dumps(data)

    # for testing
    print (json_data)

    return jsonify(json_data)

# get the review from rotten tomatoes
# format: movie_title
@app.route("/review/title=<string:title>")
def getRtReview(title):

    # running the shell scrip to web scrap the rt review
    p =  Popen(['./webscraping/rt_review.sh', title], stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(b"input data that is passed to subprocess' stdin")
    rc = p.returncode

    
    # get the link 
    review = output.decode('ascii')

    # print the review (for testing)
    print (review)

    # making json object
    data = {"movie_title": title, "rotten tomatoes review": review}

    json_data = json.dumps(data)

    # for testing
    print (json_data)

    return jsonify(json_data)
app.run(port=4897, debug=True)
