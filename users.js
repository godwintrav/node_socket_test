var users = [];

//user join chat
function addUser(id, number){
    const user = {id, number};
    users.push(user);
    return user;
} 

//Get current user
function getCurrentUser(id){
    console.log(users.find(user => user.id === id));
    return users.find(user => user.id === id);
}

