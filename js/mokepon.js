function iniciarJuego()
{
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador()
{
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangostelvis = document.getElementById('langostelvis')
    let inputTucapalma = document.getElementById('tucapalma')
    let inputTydos = document.getElementById('tydos')
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
    }else if(inputLangostelvis.checked)
    {
        spanMascotaJugador.innerHTML = 'Langostelvis'
    }else if(inputTucapalma.checked)
    {
        spanMascotaJugador.innerHTML = 'Tucapalma'
    }else if(inputTydos.checked)
    {
        spanMascotaJugador.innerHTML = 'Tydos'
    }else{
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo()
{
    let ataqueAleatorio = aleatorio(1,6)
    let spanMacotaEnamigo = document.getElementById('mascota-enemigo')

    if(ataqueAleatorio == 1)
    {
        spanMacotaEnamigo.innerHTML = 'Hipodoge'
    }else if(ataqueAleatorio == 2)
    {
        spanMacotaEnamigo.innerHTML = 'Capipepo'
    }else if(ataqueAleatorio == 3)
    {
        spanMacotaEnamigo.innerHTML = 'Ratigueya'
    }else if(ataqueAleatorio == 4)
    {
        spanMacotaEnamigo.innerHTML = 'Langostelvis'
    }else if(ataqueAleatorio == 5)
    {
        spanMacotaEnamigo.innerHTML = 'Tucapalma'
    }else if(ataqueAleatorio == 6)
    {
        spanMacotaEnamigo.innerHTML = 'Tydos'
    }
}

function aleatorio(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)