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
};

## login

api name : baseurl/auth/login,
method : POST
request Body : {email,password}
response body : {
status : success,
message : 'user logged in successfully <username>  
 data : <data>
};

## logout

api name : baseurl/auth/logout,
method : POST
response body : {
status : success,
message : 'user logged out successfully <username>  
 };

## User Api

## get user profile

api name : baseurl/user/get-user-profile,
method : GET
response body : {
status : success,
message : 'user profile fetched successfully <username>  
 data : <data>
};

## reset password

api name : baseurl/user/reset-password,
method : PUT
request Body : {oldpassword,newpassword}
response body : {
status : success,
message : 'user password changed successfully <username>  
 data : <data>
};

## forget password

## Otp Api

## send-otp

## verify otp

## TEAM API -- the one person make team is declared as an --> admin

## TEAM -- frontend -- team-name , team-description , team-profilePicture

## THIS WEEK

/list-all-team -- GET -- show list of all available teams where user is not a member or even admin

response:{
teamName,
teamDescription,
teamPhoto,
adminName,
TotalNumber of members in team(inc admin)
}

/createTeam -- here we need to create a unique team key

request : {
teamName:"", [mandatory]
teamDescription:"", [non-mandatory]
teamPhoto:"", [non-mandatory]
}

response : {
teamName,
teamKey
}

/deleteTeam -- need to remove full document

request:{
teamName:" "[mandatory]
}

response :{message : team deleted successfully}

/updateTeam -- need to keep team key same

request:{
teamName:"", [mandatory]
teamDescription:"", [non-mandatory]
teamPhoto:"", [non-mandatory]
}

response : {
teamName,
teamKey
}

/search-team -- POST

request:{
teamKey
}

response:{
teamName,
teamDescription,
teamPhoto,
adminName,
TotalNumber of members in team(inc admin)
}

##################################################################################################################

NEXT WEEK THING

/join-team

/leave-team

/list-my-Team -- (admin specific) -- get -- list all team created by that user --

response:{
teamName,
teamDescription,
teamPhoto,
adminName,
TotalNumber of members in team(inc admin)
}

/list-joined-team -- list of all team where admin is a user
response:{
teamName,
teamDescription,
teamPhoto,
adminName,
TotalNumber of members in team(inc admin)
}









///API 

service : send otp

POST :  http://localhost:8080/taskmate/otp/send-otp

BODY : {
    "email":"kartikworksss@gmail.com",
    "mobile":"9310605985"
}


service : verify otp

POST :  http://localhost:8080/taskmate/otp/verify-otp

BODY : {
    "email":"kartikworksss@gmail.com",
    "otp":"670152"
}


service : forget password

PATCH : http://localhost:8080/taskmate/auth/set-new-password

BODY : {
    "resetToken":"b8521a7d698280932eff9685e580b83aa276dacf7aeed3b8b6ebfbe10b307ff5",
    "newPassword":"Kartikbhatt@652003"
}