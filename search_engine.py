
from omdb_api import Omdb_api
from itunes_api import Itunes_api
from movie import Movie
class Search_engine():
    def __init__(self):
        self._omdb = Omdb_api()
        self._itunes = Itunes_api()
    def search_by_title(self,title):
        movies_list = []
        title_list = self._omdb.get_id_list(title)
        if len(title_list)== 0:
            return []

        for item in title_list:
            m = Movie()
            # put the basic information of the movie into the movie item
            self._omdb.set_movie_byid(item,m)
            # put the itunes price info into the movie item
            

           
            p = self._itunes.search_platform(m)
            if(p != None):
                m.add_platforms(p)
            movies_list.append(m)

        return movies_list
    


if __name__ == "__main__":
    engine = Search_engine()
    movielist = engine.search_by_title("Rush hour")
    for item in movielist:
        print("title %s date %s"%(item.getTitle(),item.getDate()))
        for p in item.getPlatforms():
            print(p.getName())
            print(p.getPrice())
            print(p.getLink())
        print("")
    
        
    