//this is model for the user which hold data
//of specific user 
function User(username,password,email,realname,projects){
    this.username = username;
    this.password = password;
    this.email = email ;
    this.realname = realname;
    this.projects = projects;
}

module.exports = User ;