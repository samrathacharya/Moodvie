

import datetime
class Movie():
    def __init__ (self,title = "",date = None,casts = [],synopsis="",trailors=[],platforms={},imdb=-1,rt=-1,mt = -1,reviews={}):
        self._title = title
        self._release_date=date
        self._casts=casts
        self._synopsis=synopsis
        self._trailers=trailors
        self._platforms=platforms
        self._imdb_rating =imdb
        self._rt_rating = rt
        self._mt_rating = mt
        self._top_reviews=reviews

    def getTitle(self):
        return self._title

    def getDate(self):
        return self._release_date

    def getCasts(self):
        return self._casts
    def getSynopsis(self):
        return self._synopsis

    def getTrailors(self):
        return self._synopsis
    
    def getPlatforms(self):
        return self._platforms
    def getImdbRating(self):
        return self._imdb_rating
    def getRtRating(self):
        return self._rt_rating
    def getMtRating(self):
        return self._mt_rating




    



    def setTitle(self,string):
        self._title = string
    
    def setDate(self,dates):

        self._release_date = dates

    def setCasts(self,casts):
        self._casts= casts
    
    def setSynopsis(self,summary):
        self._synopsis = summary
    
    def setTrailors(self,trailos):
        self._trailers = trailos
    
    def setPlatforms(self,p):
        self._platforms= p
    def setImdbRating(self,r):
        self._imdb_rating= r
    def setRtRating(self,r):
        self._rt_rating = r
    def setMtRating(self,r):
        self._mt_rating= r


    def add_cast(self,new_cast):
        self._casts.append(new_cast)
    def add_trailor(self,new_t):
        self._trailers.append(new_t)
    def add_platforms(self,new_p):
        self._platforms.append(new_p)
    def add_reviews(self,reviews):
        self._top_reviews.append(reviews)
        
    
    
    