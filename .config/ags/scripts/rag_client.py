from multiprocessing.connection import Client
from multiprocessing.connection import Client
from multiprocessing import Pool
import sys

address = ('localhost', 6000)
#conn = Client(address, authkey=b'secret password')
#conn.send('Hello?' )
# response = conn.recv()
# print(response)


# can also send arbitrary objects:
# conn.send(['a', 2.5, None, int, sum])
#conn.close()
question = ""
if len(sys.argv) > 1:
    question = sys.argv[1]
    #print(address)
else:
    #print to stderr
    print("Usage: python rag_client.py <question>", file=sys.stderr)
    exit(1)





def receive():
    conn = Client(address, authkey=b'secret password')
    conn.send(question)
    reponse = conn.recv()
    return reponse

#address = ('localhost', 6000)


pool = Pool(processes=1)
result = pool.apply_async(receive)

try:
    response = result.get(timeout=7)  # Set a timeout of 5 seconds
    print(response)
except TimeoutError:
    print('recv() took too long check that rag_server.py is running',file=sys.stderr)