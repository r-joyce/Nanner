# NMap Node API

Deploy a Node.js json-server that accepts RESTful API calls to dynamically scan an IP address or a range of IP addresses with the popular NMap scanning tool. Converts the standard XML output to JSON.

**Building**

`docker build -t ryanjoyce/nmap .`

**Starting**

`docker run -p 3000:3000 ryanjoyce/nmap`

**Query**

Perform a simple GET request against `http://<node-server-ip>:3000/api/<ip>` where `node-server-ip` is the IP address of this newly created container and `ip` is the IP address/range that you wish to be scanned.

The Node server should then perform a scan using NMap, output to XML, and use a python script to convert the XML to JSON and return.

*Note: Due to how XML works, there may be inconsistencies with data layout with the conversion from XML to JSON.*
