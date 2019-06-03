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


# get the price
wget -q -O- "$youtobe_url" |
grep -E -o ">Watch from A[$][0-9]+.[0-9]*" |
 egrep -o "[$][0-9]+.[0-9]*" | 
 uniq |
 head -1 #> result.txt


# the link
echo "$youtobe_url"

#echo "shell:$1,$2,$movie_title, $movie_year, $youtobe_url"


exit 0