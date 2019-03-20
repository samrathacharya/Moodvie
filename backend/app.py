from flask import Flask, jsonify
from search_engine import Search_engine
import subprocess
import shlex
app = Flask(__name__)
engine = Search_engine()


@app.route('/')
def home():
    return "hello world"

# search a movie by title
# GET /search/term=<string: title>
@app.route('/search/term=<string:title>')
def search_by_title(title):
    new_title = title[1:len(title)-1]
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


app.run(port=4897, debug=True)
