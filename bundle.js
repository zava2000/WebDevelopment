document.addEventListener('DOMContentLoaded', function(){
    scrolNav();

    navegacionFija();
});

function scrolNav (){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach(function(enlace){
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}

function navegacionFija(){
    const barra = document.querySelector('.header')
    // Registrar el intersection observer
    const observer = new IntersectionObserver(function(entries){
        if (entries[0].isIntersecting){
            barra.classList.remove('fijo');
        }else{
            barra.classList.add('fijo');
        }
    })

    // Elemento a observar
    observer.observe(document.querySelector('.sobre-festival'));

};
document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        // Agregar la funcion mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI')
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId)
    console.log(id);

    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // Cuando se da click, cerrar la imagen
    overlay.onclick = function(){
        overlay.remove();
    }
    // Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X'
    cerrarImagen.classList.add('botonCerrar');

    // Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function(){
        overlay.remove();
    }

    overlay.appendChild(cerrarImagen);

    // Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}