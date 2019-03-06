

import datetime
class Movie():
    def __init__ (self,title = None,date = None,casts = [],synopsis=None,trailors=[],platforms=[],imdb=None,rt=None,mt = None,pic=None,reviews={}):
        self._title = title #omdb
        self._release_date=date #omdb
        self._casts=casts #omdb
        self._synopsis=synopsis #omdb
        self._imdb_rating =imdb #omdb
        self._rt_rating = rt #omdb
        self._mt_rating = mt #omdb
        self._poster = pic #omdb
        self._top_reviews=reviews
        self._trailers=trailors 
        self._platforms=platforms
        
    def getPoster(self):
        return self._poster



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




    
    def setPoster(self,pic_link):
        self._poster = pic_link

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
        
    
    
    