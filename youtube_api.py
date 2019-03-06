
from apiclient.discovery import build
from apiclient.errors import HttpError
#from oauth2client.tools import argparser





class youtube_api_reader():
    def __init__(self):
        self._DEVELOPER_KEY = "AIzaSyAydWBaPvlWkNOvwZ3mwCRaUzubdY0h96M"
        self._YOUTUBE_API_SERVICE_NAME = "youtube"
        self._YOUTUBE_API_VERSION = "v3"
        self._youtube = build(self._YOUTUBE_API_SERVICE_NAME, self._YOUTUBE_API_VERSION,
                        developerKey=self._DEVELOPER_KEY)

    def youtube_search(self,**kwargs):

        kwargs = self.remove_empty_kwargs(**kwargs)

        search_response = self._youtube.search().list(
            **kwargs

        ).execute()
        # filter out the inrelevant results;
        title = kwargs['q']
        title_list= []
        #title_list.append(title)
        #print("Hey")
        for search_iter in search_response.get('items',[]):

            string = search_iter['snippet']['title']
            s= string.lower()
            if title in s:
                title_list.append(string) 
        return title_list
    # Remove keyword arguments that are not set
    def remove_empty_kwargs(self,**kwargs):
        good_kwargs = {}
        if kwargs is not None:
            for key, value in kwargs.items():
                if value:
                    good_kwargs[key] = value
        return good_kwargs