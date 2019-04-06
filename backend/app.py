from flask import Flask, jsonify, request
from search_engine import Search_engine
from subprocess import Popen, PIPE
import subprocess
import shlex
from flask_cors import CORS
from initialize import db_reader_u, db_writer_u
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
app = Flask(__name__)
CORS(app)
engine = Search_engine()
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
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
# get the google platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/trailor/title=<string:title>&date=<string:date>")
def getTrailor(title, date):
    title = title.replace(" ", "_")
    print(title)
    p = Popen(['./webscraping/youtobe_trailer.sh', title, date],
              stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(
        b"input data that is passed to subprocess' stdin")
    rc = p.returncode

    # remove newline
    info_list = output.splitlines()

    videoCode = info_list[0].decode('ascii')

    videoPic = info_list[1].decode('ascii')

    # FOR TESTING
    # print(videoCode)

    # print(videoPic)

    # making json object
    data = {"link": "https://www.youtube.com/watch?v=" +
            videoCode, "pic": videoPic}

    #json_data = json.dumps(data)

    # testint
    # print(json_data)

    return jsonify(data)

# get the youtobe price
# format: movie_title year
@app.route("/platforms/youtube/title=<string:title>&date=<string:year>")
def getYoutobePrice(title, year):

    # running the shell scrip to web scrap the youtobe price
    p = Popen(['./webscraping/youtobe_price.sh', title, year],
              stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(
        b"input data that is passed to subprocess' stdin")
    rc = p.returncode
    print(output)
    # split the output line by line
    info_list = output.splitlines()

    # get the price
    price = info_list[0].decode('ascii')

    # check if the price is in correct format
    if not price.startswith("$"):
        return jsonify({"name": "youtube",
                        "price": "N/A", "link": "N/A"})

    # get the link
    link = info_list[1].decode('ascii')

    # print the price and link (for testing)

    # making json object
    data = {"name": "youtube",
            "price": price, "link": link}

    # json_data = json.dumps(data)

    # for testing
    # print (json_data)

    return jsonify(data)

# get the review from rotten tomatoes
# format: movie_title
@app.route("/review/title=<string:title>")
def getRtReview(title):

    # running the shell scrip to web scrap the rt review
    p = Popen(['./webscraping/rt_review.sh', title],
              stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(
        b"input data that is passed to subprocess' stdin")
    rc = p.returncode

    # get the link
    review = output.decode('ascii')

    # print the review (for testing)
    print(review)

    # making json object
    data = {"movie_title": title, "rotten tomatoes review": review}

    # json_data = json.dumps(data)

    # for testing
    #print (json_data)

    return jsonify(data)

@app.route("/users/signup", methods=["GET","POST"])
def register() :


    # username = "Joey"
    # email = "j"
    # password = "j"
    result = {}
    if request.method == "POST":
        username = request.get_json()['username']
        email = request.get_json()['email']
        password = request.get_json()['password']
        if db_writer_u.register(username, password, email):
            #
            result["username"] = username
            result["email"] = email
            result["password"] = password
            result["result"] = "success"
            print("in the if\n")
            #result={"result": "regestration success" }
            return jsonify(result)
                    
        else:
            # duplicate
            print("in the else\n")
            result={"result": "fail"}
    else:
        result={"result": "fail"}
    #     print("failed\n")

    return jsonify(result)

@app.route("/users/login", methods=["GET","POST"])
def login() :
    # username = "Joey"
    # email = "j"
    # password = "j"
    result = {}
    if request.method == "POST":
        username = request.get_json()['username']
        password = request.get_json()['password']
        if db_reader_u.checkAccount(username, password):
            #
            # result["username"] = username
            # result["password"] = password
            # result["result"] = "success"
            print("in the if\n")
            access_token = create_access_token(identity = {'username': username})
            result = jsonify({"token": access_token})
            #result={"result": "regestration success" }
            return jsonify(result)
                    
        else:
            # duplicate
            print("in the else\n")
            result= jsonify({"error": "Invalid username and password"})
    else:
        result= jsonify({"error": "Invalid username and password"})
    #     print("failed\n")

    return result
app.run(port=4897, debug=True)
