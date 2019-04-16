#!/bin/sh

if test $# != 2
then
    echo "Usage: $0 <Movie-Title> <Movie-Year>"
    exit 1
fi
movie_year=$2
movie_title=`echo "$1" |
            sed "s/_//g"`
            #echo "$movie_title"
            #https://play.google.com/store/search?q=transformers&c=movies
google_url="https://play.google.com/store/search?q=$movie_title+$movie_year"
# amazone_url="https://www.amazon.com/s?k=$movie_title&i=instant-video"


# get the price
wget -q -O- "$google_url" |
egrep "<span class=\"display-price\">\$[0-9]*\.[0-9]*</span>"


# the link
echo "$google_url"


exit 0