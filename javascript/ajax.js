async function getRequest(file, symbol){
    let params = `symbol=${symbol}`;
    return new Promise(function (resolve, reject){
        const request = new XMLHttpRequest();
        request.open('GET', file + "?" + params);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                resolve(this);
            }
        }
        request.send(null);
    });
}