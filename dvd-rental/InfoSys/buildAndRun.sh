#!/bin/sh
mvn clean package && docker build -t hu.uni.miskolc.iit/InfoSys .
docker rm -f InfoSys || true && docker run -d -p 8080:8080 -p 4848:4848 --name InfoSys hu.uni.miskolc.iit/InfoSys 
