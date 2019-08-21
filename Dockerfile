FROM nginx
COPY build/ /app/
COPY nginx/ /conf/
COPY entrypoint.sh /entrypoint.sh
EXPOSE 3000
RUN chmod +x /entrypoint.sh
ENTRYPOINT /entrypoint.sh