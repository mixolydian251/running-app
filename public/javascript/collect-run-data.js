function submission() {
    console.log('submit function running..');
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var user = {
        name: name,
        email: email
    };

    // Sends Client side Posts to API
    axios.post('/request', {
        name: name,
        email: email
    })
        .then(function(response){
            console.log('saved successfully', response)
        }).catch((error) => {
        console.log(error)
    });

    console.log(user);
    return false
}