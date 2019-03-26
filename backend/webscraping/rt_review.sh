#!/bin/sh

if test $# != 1
then
    echo "Usage: $0 <Movie-Title>"
    exit 1
fi
movie_title=$1
base_url="https://www.rottentomatoes.com/m/$1/reviews/?type=top_critics"

wget -q -O- "$base_url" > result.txt
# head -222 |
# tail -1 |
# cut -d'' -f2
# |
#egrep -o "<div class=\"the_review\">.*\.</div>" #|
# cut -d'<' -f2 |
# sed s/.*\>//g