
import requests
class Itunes_api():
    def __init__(self):
        self._link = "https://itunes.apple.com/search?media=movie"
    
    def search_price(self,title):
        string = "&term=" +title
        response = requests.get(self._link + string)
        result_dictionary = response.json()
        if(result_dictionary['resultCount']==0):
            return
        results= result_dictionary['results']
    

