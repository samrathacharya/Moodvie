
import requests
from platforms import Platform
from datetime import datetime
class Itunes_api():
    def __init__(self):
        self._link = "https://itunes.apple.com/search?media=movie"
    
    def set_platform(self,movie):
        # search the movie on itunes according its title and date
        title = movie.getTitle()
        string = "&term=" + title
        response = requests.get(self._link + string)
        result_dictionary = response.json()
        # no result found
        if(result_dictionary['resultCount']==0):
            return
        
        # get the result list from the json
        results_list= result_dictionary['results']
        
        for item in results_list:
            
            date = self.date_convert(item['releaseDate'])
            #compare title and the date in result list
            
            if item['trackName'].lower() == title.lower() and date == movie.getDate():
                #print("movie name: %s date %s Movie date %s" % (movie.getTitle(),date,movie.getDate()))


                #get the price of itunes
                if 'trackRentalPrice' in item.keys():
                    movie.add_platforms( Platform("itunes",item['trackRentalPrice'],item['trackViewUrl']))
                    return
                elif 'trackPrice' in item.keys():
                    movie.add_platforms( Platform("itunes",item['trackPrice'],item['trackViewUrl']))
                    return
                else:
                    for item_key in item.keys():
                        if 'Price' in item_key:
                            movie.add_platforms( Platform("itunes",item[item_key],item['trackViewUrl']))
                            return 
                            
                return
            
        
    
    def date_convert(self,date):
        if date == None or date == "N/A":
            return "N/A"
        date= date[0:10]
        return datetime.strptime(date,'%Y-%m-%d')
