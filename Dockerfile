FROM nginx
COPY build /app/
WORKDIR /app
RUN echo 'server{'> /etc/nginx/conf.d/default.conf \
	&& echo '    listen 8080;'>> /etc/nginx/conf.d/default.conf \
	&& echo '    location / {'>> /etc/nginx/conf.d/default.conf \
	&& echo '        root /app;'>> /etc/nginx/conf.d/default.conf \
	&& echo '        try_files $uri uri/ @router;'>> /etc/nginx/conf.d/default.conf \
	&& echo '        index index.html;'>> /etc/nginx/conf.d/default.conf \
	&& echo '    }'>> /etc/nginx/conf.d/default.conf \
	&& echo '    location @router {'>> /etc/nginx/conf.d/default.conf \
	&& echo '        rewrite ^.*$ /index.html last;'>> /etc/nginx/conf.d/default.conf \
	&& echo '    }'>> /etc/nginx/conf.d/default.conf \
	&& echo '}'>> /etc/nginx/conf.d/default.conf