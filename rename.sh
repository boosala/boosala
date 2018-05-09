#!/bin/bash
cd frames/
X=1
while [ $X -le 100 ]
do
	mv refcampvid_000$X _undefined.png refcampvid$X.png
	X=$((X+1))
done
