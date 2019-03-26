from subprocess import Popen, PIPE
import json
#@app.route("/price/title=<string:title>&date=<string:year>")
# def getRtReview(title):

#     # running the shell scrip to web scrap the review
#     p =  Popen(['./rt_review.sh', title], stdin=PIPE, stdout=PIPE, stderr=PIPE)
#     output, err = p.communicate(b"input data that is passed to subprocess' stdin")
#     rc = p.returncode

#     # split the output line by line
#     #info_list = output.splitlines()

#     # get the price
#     #price = info_list[0].decode('ascii')

#     #check if the price is in correct format
#     #if not price.startswith("$"):
#     #    return {"result": "not found"}
    
#     # get the link 
#     link = output.decode('ascii')

#     # print the price and link (for testing)


#     # making json object
#     data = {"movie_title": title, "review": link}

#     json_data = json.dumps(data)

#     # for testing
#     print (json_data)

#     return json_data

# getRtReview("transformers")
#@app.route("/price/title=<string:title>&date=<string:year>")
def getYoutobePrice(title, year):

    # running the shell scrip to web scrap the youtobe price
    p =  Popen(['./youtobe_price.sh', title, year], stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(b"input data that is passed to subprocess' stdin")
    rc = p.returncode

    # split the output line by line
    info_list = output.splitlines()

    # get the price
    price = info_list[0].decode('ascii')

    #check if the price is in correct format
    if not price.startswith("$"):
        return {"result": "not found"}
    
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

    return json_data

# testing
getYoutobePrice("rush_hour","2007")