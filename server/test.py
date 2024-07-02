import requests
import json
import time
with open("C:/Users/Sergey/Desktop/automatization-alabuga/server/users.json", "r") as read_json:
    users = json.load(read_json)
for user in users:
    data={
        "mail":user["email"],
        "name": user["name"],
        "phone":user["phone"],
        "password":"password",
        }
    response = requests.post("http://localhost:3000/addNewUser", json=data)
    print(response.status_code)
    time.sleep(0.5)