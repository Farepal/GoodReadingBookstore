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
&nbsp;"email": "budiono_ksai@gmail.com",  
&nbsp;"password": "ke3su%cisAAn",  
&nbsp;"storeName": "GRB Ahmad Yani"  
}  

login staff  
POST /staff/login  
request body example  
{  
&nbsp;"email": "repalfarel@gmail.com",  
&nbsp;"password": "#kuCingG4r0n9"  
}  

mengubah beberapa data staff  
PATCH /staff/:staffId
request body example  
{  
&nbsp;"storeId": 2, (optional)  
&nbsp;"email": "sasdajl@gmail.com" (optional)  
&nbsp;"password": "K4ucin9G@rong"  (optional)  
}  

# Customer  
