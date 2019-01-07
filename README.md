# Node Scanner

Deploy a Node Express server that accepts RESTful API calls to dynamically scan an IP address or a range of IP addresses with the popular NMap scanning tool, converting the standard XML output to JSON.

Future plans are to include:
- More open source scanning tools
- Define an OpenAPI standard
- Token authentication

**Building**

`docker build -t ryanjoyce/nanner .`

**Starting**

`docker run -p 3000:3000 ryanjoyce/nanner`

**Scanning**

Perform a simple POST request against `http://<node-server-ip>:3000/api/<tool>` where `node-server-ip` is the IP address of this newly created container and `tool` is the tool to be used for the scan. Refer below to the specific tool and the expected layout of the request.

**NMap Scan**

To scan with NMap, in the body of the request include a JSON blob of:

```
{
	"ip": "<ip/cidr ip>",
	"args": "<args to pass to NMap>"
}
```

The server should then perform a scan using NMap, output to XML, and use a python script to convert the XML to JSON and return.

*Note: Due to how XML works, there may be inconsistencies with data layout with the conversion from XML to JSON.*
