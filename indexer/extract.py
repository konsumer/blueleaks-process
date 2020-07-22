import os
import time
import socket
from urllib.parse import urlparse
from glob import glob
from elasticsearch import Elasticsearch
from elasticsearch.client.ingest import IngestClient
from zipfile import ZipFile
from  base64 import b64encode

INPUT = os.environ.get('INPUT') or "/data"
ELASTICSEARCH = os.environ.get('ELASTICSEARCH') or "http://localhost:9200"
COLLECTION = os.environ.get('COLLECTION') or "fileindex"

# wait for elasticsearch to be ready
def wait_for_port(port, host='localhost', timeout=20.0):
    start_time = time.perf_counter()
    while True:
        try:
            with socket.create_connection((host, port), timeout=timeout):
                break
        except OSError as ex:
            time.sleep(0.01)
            if time.perf_counter() - start_time >= timeout:
                raise TimeoutError('Waited too long for the port {} on host {} to start accepting connections.'.format(port, host)) from ex
o = urlparse(ELASTICSEARCH)
wait_for_port(o.port, o.hostname)

es = Elasticsearch([ELASTICSEARCH])

# add attachment pipeline
p = IngestClient(es)
p.put_pipeline(id='attachment', body={
    'description': "Extract attachment information",
    'processors': [
        {"attachment": {"field": "data"}}
    ]
})

# find all files in all zip files and index them
# TODO: would the foreach processor help here?
for z in glob('%s/*.zip' % (INPUT)):
	zipFilename = os.path.basename(z)
	print(zipFilename)
	with ZipFile(z, 'r') as zfile:
		for file in zfile.infolist():
			if (file.is_dir):
				next
			ext = os.path.splitext(file.filename)[1]
			if not ext:
				next
			if ext.lower() in [".csv", ".txt", ".doc", ".pdf", ".ppt", ".xls", ".xlsx", ".rtf", ".png", ".jpg"]:
				with zfile.open(file.filename) as myfile:
					doc = {
						'data': b64encode(myfile.read()).decode('ascii'),
						'zip': zipFilename,
						'filename': file.filename,
						'extension': ext
					}
					res = es.index(index=COLLECTION, id="%s:%s" % (zipFilename, file.filename), body=doc, pipeline="attachment", timeout="60s")
					print("  %s: %s" % (file.filename, res['result']))
