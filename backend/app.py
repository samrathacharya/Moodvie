from flask import Flask, jsonify
from search_engine import Search_engine
app = Flask(__name__)
engine = Search_engine()


@app.route('/')
def home():
    return "hello world"


# GET /search/term=<string: title>
@app.route('/search/term=<string:title>')
def search_by_title(title):
    new_title = title[1:len(title)-1]
    title = new_title

    movielist = engine.search_by_title(title)
    moviedict = dict()
    i = 0

    for item in movielist:
        itemdict = dict()
        itemdict["title"] = item.getTitle()
        itemdict["date"] = item.getDate()
        #itemdict['case'] = item.getCasts()
        #itemdict['synopsis'] = item.getSynopsis()
        # itemdict['rating'] = {"imdb": item.getImdbRating(
        # ), "rt": item.getRtRating(), "mt": item.getMtRating()}
        itemdict['poster_link'] = item.getPoster()
        moviedict[i+1] = itemdict
        i += 1

    return jsonify({"keyword": title, "resultCount": i, "movies": moviedict})


app.run(port=4897, debug=True)
