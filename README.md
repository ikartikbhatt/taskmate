
## models

## user Model

id(mongo id by default)
email(unique)
username,
password,
role (enum : admin and user),


################################################################################################################################

## API DOCUMENTATION

## Base Url : "http://localhost"

## Authentication Api

## signup
api name : baseurl/auth/signup,
method : POST
request Body : {email,password}
response body : {
                 status : success,
                 message : 'user created successfully <username>           
                 data : <data>
                }


## login
api name : baseurl/auth/login,
method : POST
request Body : {email,password}
response body : {
                 status : success,
                 message : 'user logged in successfully <username>           
                 data : <data>
                }



## logout
api name : baseurl/auth/logout,
method : POST
response body : {
                 status : success,
                 message : 'user logged out successfully <username>           
                }



## User Api

## get user profile
api name : baseurl/user/get-user-profile,
method : GET
response body : {
                 status : success,
                 message : 'user profile fetched successfully <username>           
                 data : <data> 
                }


## reset password
api name : baseurl/user/reset-password,
method : PUT
request Body : {oldpassword,newpassword}
response body : {
                 status : success,
                 message : 'user password changed  successfully <username>           
                 data : <data> 
                }


## forget password








## Otp Api

## send-otp

## verify otp