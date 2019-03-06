import requests
from movie import Movie
from datetime import datetime
class Omdb_api():
    def __init__(self):
        self._link = "http://www.omdbapi.com/?apikey=358bbe35"

    def set_movie_byid(self,id,movie):
        string = "&i=" + id
        response = requests.get(self._link + string)
        result_dictionay = response.json()
        if result_dictionay['Response'] == "False":
            return False

        movie.setTitle(result_dictionay['Title'])
        movie.setDate(self.date_convert(result_dictionay['Released']))
        movie.setSynopsis(result_dictionay['Plot'])
        
        casts = result_dictionay['Actors']

        casts_list = casts.split(", ")
        for name in casts_list:
            movie.add_cast(name)
        
        ratings = result_dictionay['Ratings']

        for tmp in ratings:
            if tmp['Source'] == "Rotten Tomatoes":
                movie.setRtRating(tmp['Value'])
            if tmp['Source'] == "Metacritic":
                movie.setMtRating(tmp['Value'])
        
        movie.setImdbRating(result_dictionay['imdbRating'])
        movie.setPoster(result_dictionay['Poster'])
        return True
    def get_id_list(self, title):
        string = '&type="Movie"&s='+title
        response = requests.get(self._link + string)
        result_dictionay = response.json()
        # check if there is any matching result
        if result_dictionay['Response'] == "False":
            print("false heres")
            return []
        
        id_list=[]
        search_resultList = result_dictionay['Search']

        for item in search_resultList:
            id_list.append(item['imdbID'])
        return id_list
    def date_convert(self,date):
        if date == None or date == "N/A":
            return "N/A"
        return datetime.strptime(date,'%d %b %Y')



   