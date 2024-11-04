document.querySelector('#form').addEventListener('submit', e =>{
    e.preventDefault();

    const name = document.querySelector('#teste').value
    const reCaptcha = document.querySelector('#g-recaptcha-response').value

    fetch('/subscribe', {
        method: "POST",
        headers:{
            'Accept': 'application/json, text/plain , */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name: name})

    })
    .then((res)=> res.json())
    .then((data)=>{
        alert(data.msg)
        location.reload();
    })
})