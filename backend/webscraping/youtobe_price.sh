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
youtobe_url="https://www.youtube.com/results?search_query=$movie_title+$movie_year"
# amazone_url="https://www.amazon.com/s?k=$movie_title&i=instant-video"

# wget -q -O- "$amazone_url" |
# egrep -o ">Transformers</span><"


wget -q -O- "$youtobe_url" |
egrep -o ">Watch from A[$]\d+.\d*" |
egrep -o "[$]\d+.\d*"
 