// Swal.fire(
//     'The Internet?',
//     'That thing is still around?',
//     'question'
//   )
  

let myPikachu = document.querySelector('#myPikachu');

myPikachu.addEventListener('click',async() => {
    let res = await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json()
    //console.log(res)
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: `${res.sprites.front_default}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
})

