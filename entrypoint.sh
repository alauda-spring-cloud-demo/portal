#!/bin/sh
JS_PATH="/app/static/js/"
CONFIG_FILE_NAME="config"
CONFIG_FILE=$JS_PATH$CONFIG_FILE_NAME".js"
INDEX_FILE="/app/index.html"
touch $CONFIG_FILE
for VAR in $INJECT_ENV
do
	VAL=`eval echo "$"$VAR`
	if [ -n "$VAL" ]; then
		echo "window.$VAR='$VAL';">>$CONFIG_FILE
	fi;
done
if [ -f $CONFIG_FILE ]; then
	MD5=`md5sum $CONFIG_FILE|awk '{print $1}'`
	MD5_CONFIG_FILE_NAME=$CONFIG_FILE_NAME"_"$MD5".js"
	mv $CONFIG_FILE $JS_PATH$MD5_CONFIG_FILE_NAME
	sed -i "s/<script/<script type='text\/javascript' src='\/static\/js\/$MD5_CONFIG_FILE_NAME'><\/script>&/" $INDEX_FILE
fi;
cp /conf/nginx.$PROFILE.conf /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'