from flask import Flask, jsonify, request
from search_engine import Search_engine
from subprocess import Popen, PIPE
import subprocess
import shlex
from flask_cors import CORS
from initialize import db_reader_u, db_writer_u, db_reader_m, db_writer_m
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
app = Flask(__name__)
CORS(app)
engine = Search_engine()
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = 'secret'
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
@app.route("/result_id=<string:id>", methods=["GET","POST"])
def basic_movie_info(id):

    new_id = id[0:len(id)-0]
    id = new_id


    if db_reader_m.checkID(id):
        info = engine.get_movie(id)
        cas = ""
        if (info is not None):
            title = info['title'].replace(' ', '_')
            # print(title)

            for cast in info['casts']:
                cas += '|'
                cas += cast
            db_writer_m.insert_movie(id,info['title'], info['poster_link'], info['synopsis'], info['date'], cas, info['director'], info['AgeRestriction'], info['runtime'], info['ratings']['imdb'], info['ratings']['mt'],info['ratings']['rt'],"N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A") 
            return jsonify(info)
    else:
        info1 = db_reader_m.get_info(id)
        # print("here")
        # print(info)
        casts = info1[5].split("|")

        data = {'director': info1[6], 'poster_link': info1[2], 'synopsis': info1[3], 'runtime': info1[8], 'title': info1[1], 'date': info1[4], 'casts': casts, 'AgeRestriction': info1[7], 'ratings': {'rt': info1[11], 'mt': info1[10], 'imdb': info1[9]}}

    return jsonify(data)

# get the platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/title=<string:title>&date=<string:date>")
def getPlatforms(title, date):
    return "all"
    pass


# get the Itunes platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/itunes/title=<string:title>&date=<string:date>&id=<string:id>")
def getItunes(title, date, id):
    # print(title[1:len(title)-1])
    info = db_reader_m.check_price(id, "Itunes")

    if (info):
        pass
    else:
        # print("++++++++++++++++++itunes+++++++++++++++++=")
        return jsonify({"name": "itunes", "price": info[1], "link": info[2]})

    info = engine.get_Itunes(title,date)
    if (db_writer_m.update_price(id, "$"+str(info['price']), str(info['link']), "Itunes")):
        print("update itunes price successful")
    else:
        print(info)

    return jsonify(info)


# get the google platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/platforms/google_play/title=<string:title>&date=<string:date>&id=<string:id>")
def getGoogle(title, date, id):
    # print(title[1:len(title)-1])
    info = db_reader_m.check_price(id, "Google")

    if (info):
        #pass
        return jsonify({"name": "google", "price": info[1], "link": info[2]})
    else:
        return jsonify({"name": "google", "price": info[1], "link": info[2]})
    # else:
    #     return jsonify({"name": "google", "price": info[1], "link": info[2]})

    info = engine.get_googlePlay(title,date)
    if (db_writer_m.update_price(id, "$"+str(info['price']), str(info['link']), "Google")):
        print("update google price successful")
    else:
        print(info)
    return jsonify(engine.get_googlePlay(title, date))
# get the google platforms of a movie by title and date
# date formate: yr-mon-day in numeric
@app.route("/trailor/title=<string:title>&date=<string:date>&id=<string:id>")
def getTrailor(title, date, id):

    info = db_reader_m.check_trailer(id)

    if (info):
        pass
    else:
        return jsonify({"link": info[1], "pic": info[2]})

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

    if (db_writer_m.update_trailer(id, "https://www.youtube.com/watch?v=" +
            videoCode,videoPic)):
        print("trailer updated")
    # print(json_data)

    return jsonify(data)

# get the youtobe price
# format: movie_title year
@app.route("/platforms/youtube/title=<string:title>&date=<string:year>&id=<string:id>")
def getYoutobePrice(title, year, id):
    info = db_reader_m.check_price(id, "Youtobe")

    if (info):
        pass
    else:
        data = {"name": "youtube", "price": info[1], "link": info[2]}
        return jsonify(data)
    
    # running the shell scrip to web scrap the youtobe price
    p = Popen(['./webscraping/youtobe_price.sh', title, year],
              stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(
        b"input data that is passed to subprocess' stdin")
    rc = p.returncode

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

    # making json object
    data = {"name": "youtube",
            "price": price, "link": link}


    if(db_writer_m.update_price(id,price,link,"Youtube")):
        print ("update youtobe price successful")
    
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
    # print(review)

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
            # print("in the if\n")
            #result={"result": "regestration success" }
            return jsonify(result)
                    
        else:
            # duplicate
            # print("in the else\n")
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
            # print("in the if\n")
            email = db_reader_u.getEmailByUsername(username)
            access_token = create_access_token(identity = {'username':username, 'email':email})
            result = jsonify({"token": access_token, "result":"success"})
            #result={"result": "regestration success" }
                    
        else:
            # duplicate
            # print("in the else\n")
            result= jsonify({"error": "Invalid username and password","result":"failed"})
    else:
        result= jsonify({"error": "Invalid username and password","result":"failed"})
    #     print("failed\n")

    return result

@app.route("/profile",methods=["GET","POST"])
def ChangeProfile():
    if request.method == "POST":
        old_n = request.get_json()['oldUsername']
        new_n = request.get_json()['newUsername']
        old_e = request.get_json()['oldEmail']
        new_e = request.get_json()['newEmail']
        # email = request.get_json()['email']
        if db_writer_u.change_profile(old_n, old_e, new_n, new_e):
            print("Change name/email done\n")
            access_token = create_access_token(identity = {'username':new_n, 'email':new_e})
            result = jsonify({"token": access_token, "result":"success"})
        else:
            print("Change name/email failed\n")
            result= jsonify({"error": "Invalid username/email","result":"failed"})


    return result

app.run(port=4897, debug=True)
