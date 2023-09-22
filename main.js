// Swal.fire(
//     'The Internet?',
//     'That thing is still around?',
//     'question'
//   )
  

let myPikachu = document.querySelector('#myPikachu');

myPikachu.addEventListener('click',async() => {
    let res = await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json()
    let img =  res.sprites.other.dream_world.front_female;
    let defaultImg = "https://i.gifer.com/Yhw9.gif"
    //console.log(res)
    Swal.fire({
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        imageUrl: `${(img)? img:defaultImg}`,
        imageWidth: "80%",
        imageHeight: "80%",
      })
})

