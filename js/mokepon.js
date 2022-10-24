const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMacotaEnamigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = [] // Variable de Array
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botonReiniciar
let botones = []
let ataqueJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego()
{
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
    
    sectionReiniciar.style.display = 'none'
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador()
{
    //sectionSeleccionarAtaque.style.display = 'flex'
    
    sectionSeleccionarMascota.style.display = 'none'
    

    if(inputHipodoge.checked)
    {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked)
    {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked)
    {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert('Selecciona una mascota')
    }
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) 
{
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mokepones[i].nombre === mascotaJugador)
        {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques)
{
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button class="boton-de-ataque bAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botonReiniciar = document.getElementById('boton-reiniciar')

    botones = document.querySelectorAll('.bAtaque')

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function secuenciaAtaque()
{
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#8758FF'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#8758FF'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#8758FF'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo()
{
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

    spanMacotaEnamigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo()
{
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1)
    {
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4)
    {
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate()
{
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
            console.log(ataqueJugador[index])
        }else if(ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas()
{
    if(victoriasJugador === victoriasEnemigo)
    {
        crearMensajeFinal("Esto fue un Empate!!!")
    }else if(victoriasJugador > victoriasEnemigo)
    {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    }else{
        crearMensajeFinal("Lo siento, Perdiste :(")
    }
}

function crearMensaje(resultado)
{
    let nuevoAtaqueDelEnamigo = document.createElement('p')
    let nuevoAtaqueDelJugador = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnamigo.innerHTML = indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnamigo)
}

function crearMensajeFinal(resultadoFinal)
{
    sectionReiniciar.style.display = 'block'
    
    sectionMensajes.innerHTML = resultadoFinal
}

function reiniciarJuego()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height) // Limpiamos el mapa
    lienzo.drawImage(
         mapaBackground,
         0,
         0,
         mapa.width,
         mapa.height
    )
    lienzo.drawImage(
        mascotaJugadorObjeto.mapaFoto,
        mascotaJugadorObjeto.x,
        mascotaJugadorObjeto.y,
        mascotaJugadorObjeto.ancho,
        mascotaJugadorObjeto.alto
    )
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePrecionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break    
        default:
            break
    }
}
function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    mascotaJugadorObjeto = obtenerObjetoMascota()
    //console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePrecionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mokepones[i].nombre === mascotaJugador)
        {
            return mokepones[i]
        }
    }

}

window.addEventListener('load', iniciarJuego)