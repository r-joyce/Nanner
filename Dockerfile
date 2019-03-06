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
RUN npm install joi --only=production
RUN npm install express --only=production

# Install nmap
RUN apt-get install nmap -y

# Add custom scripts
RUN git clone https://github.com/vulnersCom/nmap-vulners.git
WORKDIR /usr/src/app/nmap-vulners
RUN cp vulners.nse /usr/share/nmap/scripts/
WORKDIR /usr/src/app

RUN git clone https://github.com/scipag/vulscan.git /usr/share/nmap/scripts/vulscan
WORKDIR /usr/share/nmap/scripts/vulscan
CMD ["/bin/bash","updateFiles.sh"]
WORKDIR /usr/src/app

# Install masscan
RUN git clone https://github.com/robertdavidgraham/masscan
WORKDIR /usr/src/app/masscan/
RUN make -j
WORKDIR /usr/src/app

# Install pip and install required python module
RUN apt-get install python-pip -y
RUN pip install xmltodict

# Open port
ENV PORT 3000
EXPOSE ${PORT}

# Bundle app source
COPY . .

# Make script executable
RUN chmod +x nmap/scan.sh

# Start the json-server
CMD [ "npm", "start" ]
