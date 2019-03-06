
from omdb_api import Omdb_api
from movie import Movie
class Search_engine():
    def __init__(self):
        self._omdb = Omdb_api()
    
    def search_by_title(self,title):
        movies_list = []
        title_list = self._omdb.get_id_list(title)
        if len(title_list)== 0:
            return []

        for item in title_list:
            m = Movie()
            self._omdb.set_movie_byid(item,m)
            movies_list.append(m)
        return movies_list
    


if __name__ == "__main__":
    engine = Search_engine()
    movielist = engine.search_by_title("Rush hour")
    for item in movielist:
        print(item.getTitle())
        print(item.getDate())

    
        
    