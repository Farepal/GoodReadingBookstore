Muhamad Farrel Adrian  
22/505897/TK/55394  
TEKNOLOGI INFORMASI  
  
# STAFF  
  
To get all staff  
GET /staff   

To get specific staff by staffId  
GET /staff/:staffId  

register staff  
POST /staff/register  
request body example  
{  
  "email": "budiono_ksai@gmail.com",  
  "password": "ke3su%cisAAn",  
  "storeName": "GRB Ahmad Yani"  
}  

login staff  
POST /staff/login  
request body example  
{  
  "email": "repalfarel@gmail.com",  
  "password": "#kuCingG4r0n9"  
}  

mengubah beberapa data staff  
PATCH /staff/:staffId
request body example  
{  
  "storeId": 2, (optional)  
  "email": "sasdajl@gmail.com" (optional)  
  "password": "K4ucin9G@rong"  (optional)  
}  

# Customer  
