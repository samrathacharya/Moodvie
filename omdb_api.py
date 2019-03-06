import requests
from movie import Movie

class Omdb_api():
    def __init__(self):
        self._link = "http://www.omdbapi.com/?apikey=358bbe35"

    def set_movie_byTitle(self,title,movie):
        string = "&t=" + title
        response = requests.get(self._link + string)
        result_dictionay = response.json()
        if result_dictionay['Response'] == "False":
            return False

        movie.setTitle(result_dictionay['Title'])
        movie.setDate(result_dictionay['Released'])
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
    def get_title_list(self, title):
        string = '&type="Movie"&s='+title
        response = requests.get(self._link + string)
        result_dictionay = response.json()
        if result_dictionay['Response'] == "False":
            print("false heres")
            return []
        
        title_list=[]
        search_resultList = result_dictionay['Search']
        for item in search_resultList:
            title_list.append(item['Title'])
        return title_list



   