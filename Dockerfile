FROM node:8

# Update and upgrade
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --only=production
RUN npm install json-server --only=production

# Bundle app source
COPY . .

# Install nmap
RUN apt-get install nmap -y

# Install pip and install required python module
RUN apt-get install python-pip -y
RUN pip install xmltodict

# Open port
EXPOSE 3000

# Start the json-server
CMD [ "npm", "start" ]
