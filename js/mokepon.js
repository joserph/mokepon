let ataqueJugador
let ataqueEnemigo

function iniciarJuego()
{
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaJugador()
{
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    // let inputLangostelvis = document.getElementById('langostelvis')
    // let inputTucapalma = document.getElementById('tucapalma')
    // let inputTydos = document.getElementById('tydos')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if(inputHipodoge.checked)
    {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    }else if(inputCapipepo.checked)
    {
        spanMascotaJugador.innerHTML = 'Capipepo'
    }else if(inputRatigueya.checked)
    {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    }else{
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo()
{
    let mascotaAleatoria = aleatorio(1,3)
    let spanMacotaEnamigo = document.getElementById('mascota-enemigo')

    if(mascotaAleatoria == 1)
    {
        spanMacotaEnamigo.innerHTML = 'Hipodoge'
    }else if(mascotaAleatoria == 2)
    {
        spanMacotaEnamigo.innerHTML = 'Capipepo'
    }else
    {
        spanMacotaEnamigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego()
{
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua()
{
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra()
{
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo()
{
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1)
    {
        ataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio == 2)
    {
        ataqueEnemigo = 'AGUA'
    }else{
        ataqueEnemigo = 'TIERRA'
    }

    crearMensaje()
}

function crearMensaje()
{
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con con ' + ataqueEnemigo + ' - PENDIENTE 🎉'
    sectionMensajes.appendChild(parrafo)
}

function aleatorio(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)