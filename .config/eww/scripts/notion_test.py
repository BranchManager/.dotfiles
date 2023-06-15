
import requests
import json
import sys
import subprocess as subp

def update_todo_header(data, num):
    print("updating todo header")
    print("____________________")
    print(data['properties']['Name']['title'][0]['text']['content'])
    subp.run(["eww","update","todo_header"+str(num)+"="+data['properties']['Name']['title'][0]['text']['content']])
    if num == 1:
        subp.run(["eww","update","show_todo1=true"])
    if num == 2:
        subp.run(["eww","update","show_todo2=true"])

def get_table(secret, table_id): 
    url = "https://api.notion.com/v1/databases/"+table_id + "/query"

    payload = { "filter": { "property":"Progress",
                            "status": { "equals": "In progress" }
                        } ,
        "page_size": 100}
    headers = {
        "Authorization": "Bearer"+secret, 
        "accept": "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()
    #print(json.dumps(data, indent=2))
    if data['results']:
        #print(data['results'][0])
        if len(data['results']) > 1:
            #print(data['results'][1])
            # print("First else")
            return data['results'][0],data['results'][1]
        else:
            # print("no results for 1")
            # print("Second else")
            return (data['results'][0],)
    else:
        print("no results")

def update_todo_secondary_header(data, num,notionsecret):
    print("updating todo secondary header 1st in progress card")
    otherkey = data['properties']['Table ID']['rich_text'][0]['text']['content']
    # print("other key")
    # print(otherkey)
    data = get_table(notionsecret,otherkey)
    # print("The title i guess")
    print(json.dumps(data, indent=2))
    # print("The data with 0")
    # print(data[0])
    # print("The rest of the data results ")
    print("Data len")
    print(len(data))
    
    if len(data[0]['properties']['Name']['title']) > 0:
        #update name foe num
        print("updating 2ndary card name")
        print("---" + data[0]['properties']['Name']['title'][0]['text']['content'])
        subp.run(["eww","update","todo"+str(num)+"-1="+data[0]['properties']['Name']['title'][0]['text']['content']])

    if data[0]['properties']['Due Date']['date'] != json.loads('null'):
        #update due date for num
        print("updating 2ndary card due date")
        print("---" + data[0]['properties']['Due Date']['date']['start'])
        subp.run(["eww","update","duedate"+str(num)+"1="+data[0]['properties']['Due Date']['date']['start']])
        
    if len(data) > 1:
        if len(data[1]['properties']['Name']['title']) > 0:
            #update name foe num
            print("updating 2ndary card name")
            print("---" + data[1]['properties']['Name']['title'][0]['text']['content'])
            subp.run(["eww","update","todo"+str(num)+"-2="+data[1]['properties']['Name']['title'][0]['text']['content']])
        if data[1]['properties']['Due Date']['date'] != json.loads('null'):
            #update due date for num
            print("updating 2ndary card due date")
            print("---" + data[1]['properties']['Due Date']['date']['start'])
            subp.run(["eww","update","duedate"+str(num)+"2="+data[1]['properties']['Due Date']['date']['start']])
def get_secrets():
    #print("setting key")
    with open('/home/branchmanager/.config/.secrets_n_keys', 'r') as file:
        for line in file:
            if line.startswith('notiontableid'):
                table_id = line.split(':')[1]
            if line.startswith('notionsecret'):
                notionsecret = line.split(':')[1]
    return table_id,notionsecret
                    

table_id, notionsecret = get_secrets()
# print(notionsecret)
# print(notionsecret[:-1])
# print(table_id)
data = get_table(notionsecret[:-1],table_id[:-1])
# print(json.dumps(data, indent=2))
# print(len(data))
# print(type(data))

if len(data) > 1:
    update_todo_header(data[0], 1)
    #check if we have a inner table id
    if len(data[0]['properties']['Table ID']['rich_text']) > 0:
        update_todo_secondary_header(data[0], 1,notionsecret[:-1])
        #print("LThere is a table id")
    update_todo_header(data[1], 2)
    if len(data[1]['properties']['Table ID']['rich_text']) > 0:
        #print("LThere is a table id for 1")
        update_todo_secondary_header(data[1], 2,notionsecret[:-1])

if len(data) == 1: #TODO: this needs to be finished
    # print("data len 1")
    update_todo_header(data[0], 1)
    if len(data[0]['properties']['Table ID']['rich_text']) > 0:
        update_todo_secondary_header(data[0], 1,notionsecret[:-1])

