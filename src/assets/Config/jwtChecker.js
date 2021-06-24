let token = false;

if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
}

export default token