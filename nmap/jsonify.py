import sys
import json
import xmltodict

if (len(sys.argv) == 2):
	f = open(sys.argv[1])
	xml_content = f.read()
	f.close
	print(json.dumps(xmltodict.parse(xml_content), indent=4, sort_keys=True))
