#!/bin/sh

if test $# != 1
then
    echo "Usage: $0 <Movie-Title>"
    exit 1
fi
movie_title=$1
base_url="https://www.rottentomatoes.com/m/$1/reviews/?type=top_critics"

wget -q -O- "$base_url" |
egrep -o '<div class="the_review">.*\.</div>' |
cut -d'<' -f2 |
sed s/.*\>//g