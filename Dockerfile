FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


COPY . .


# Install ntcat to exec the sh command file
RUN apt update && apt install netcat-traditional

# Add user privilege to execute the init.bash file
RUN chmod +x /usr/src/app/init.bash



EXPOSE 3000

CMD ["bash", "./init.bash"]