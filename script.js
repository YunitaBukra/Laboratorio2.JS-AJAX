/* --- CONTROL DE NAVEGACIÓN (SPA) --- */
function cambiarSeccion(seccion) {
    // Remover estados activos
    document.getElementById('navPart1').classList.remove('active');
    document.getElementById('navPart2').classList.remove('active');
    document.getElementById('secPart1').classList.remove('active');
    document.getElementById('secPart2').classList.remove('active');

    // Activar la sección correspondiente
    if (seccion === 'part1') {
        document.getElementById('navPart1').classList.add('active');
        document.getElementById('secPart1').classList.add('active');
    } else if (seccion === 'part2') {
        document.getElementById('navPart2').classList.add('active');
        document.getElementById('secPart2').classList.add('active');
    }
}

/* --- INICIALIZACIÓN Y LÓGICA DE AJAX (PARTE 2) --- */
document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    if (urlInput) {
        // Al cargar la página, inyecta la URL por defecto
        urlInput.value = window.location.href;
    }

    const estadosReadyState = {
        0: "No iniciada (UNSENT)",
        1: "Conexión establecida (OPENED)",
        2: "Petición recibida (HEADERS_RECEIVED)",
        3: "Cargando / Procesando (LOADING)",
        4: "Completada (DONE)"
    };

    const btnMostrar = document.getElementById("btnMostrar");
    const estadoPeticion = document.getElementById("estadoPeticion");
    const codigoEstado = document.getElementById("codigoEstado");
    const cabecerasRespuesta = document.getElementById("cabecerasRespuesta");
    const zonaContenidos = document.getElementById("contenidos");

    if (btnMostrar) {
        btnMostrar.addEventListener("click", () => {
            const urlTarget = urlInput.value.trim();
            
            if (!urlTarget) {
                alert("Por favor, introduce una URL válida.");
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                estadoPeticion.innerHTML = `<span class="status-badge">${estadosReadyState[xhr.readyState]}</span>`;
                
                if (xhr.readyState >= 2) {
                    codigoEstado.textContent = `Código: ${xhr.status}\nTexto: ${xhr.statusText}`;
                }

                if (xhr.readyState === 4) {
                    cabecerasRespuesta.textContent = xhr.getAllResponseHeaders() || "No se encontraron cabeceras (o bloqueado por CORS).";
                    
                    if (xhr.status >= 200 && xhr.status < 300) {
                        zonaContenidos.textContent = xhr.responseText;
                    } else {
                        zonaContenidos.textContent = `Error al descargar el contenido. Código de estado: ${xhr.status}`;
                    }
                }
            };

            xhr.onerror = () => {
                estadoPeticion.innerHTML = `<span class="status-badge" style="background:#e56b6f;">Error de Red / CORS</span>`;
                zonaContenidos.textContent = "Error: No se pudo realizar la petición. Esto sucede si la URL externa no cuenta con políticas CORS habilitadas.";
            };

            try {
                xhr.open("GET", urlTarget, true);
                xhr.send();
            } catch (error) {
                zonaContenidos.textContent = `Error de ejecución: ${error.message}`;
            }
        });
    }
});

/* --- FUNCIONES DE CONTROL PARA POPUPS JAVASCRIPT (PARTE 1) --- */
function abrirModal(id) {
    document.getElementById(id).showModal();
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.close();
    
    const input = modal.querySelectorAll('input');
    input.forEach(i => i.value = '');
    const res = modal.querySelector('.resultado');
    if(res) res.textContent = 'El resultado aparecerá aquí...';
}

/* --- LÓGICA DE PROGRAMAS JAVASCRIPT --- */
function ejecutarPalindromo() {
    const texto = document.getElementById('input1').value;
    const res = document.getElementById('res1');
    if (!texto.trim()) { res.textContent = "Por favor, escribe algo."; return; }

    const textoLimpio = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const textoInvertido = textoLimpio.split('').reverse().join('');

    res.textContent = (textoLimpio === textoInvertido) ? "¡Sí! Es un palíndromo :D" : "No, no es un palíndromo :(";
}

function ejecutarMayor() {
    const n1 = parseFloat(document.getElementById('input2-n1').value);
    const n2 = parseFloat(document.getElementById('input2-n2').value);
    const res = document.getElementById('res2');

    if (isNaN(n1) || isNaN(n2)) { res.textContent = "Por favor, ingresa ambos números."; return; }
    if (n1 > n2) { res.textContent = `El número mayor es: ${n1}`; }
    else if (n2 > n1) { res.textContent = `El número mayor es: ${n2}`; }
    else { res.textContent = "Ambos números son iguales."; }
}

function ejecutarExtraerVocales() {
    const frase = document.getElementById('input3').value.toLowerCase();
    const res = document.getElementById('res3');
    if (!frase.trim()) { res.textContent = "Por favor, escribe una frase."; return; }

    const vocalesPermitidas = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
    let vocalesEncontradas = new Set();

    for (let letra of frase) {
        if (vocalesPermitidas.includes(letra)) {
            let vocalBase = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            vocalesEncontradas.add(vocalBase);
        }
    }
    res.textContent = (vocalesEncontradas.size > 0) ? `Vocales encontradas: ${Array.from(vocalesEncontradas).sort().join(', ')}` : "No se encontraron vocales.";
}

function ejecutarContarVocales() {
    const frase = document.getElementById('input4').value.toLowerCase();
    const res = document.getElementById('res4');
    if (!frase.trim()) { res.textContent = "Por favor, escribe una frase."; return; }

    const contador = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    const equivalencias = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };

    for (let letra of frase) {
        if (equivalencias[letra]) letra = equivalencias[letra];
        if (contador.hasOwnProperty(letra)) contador[letra]++;
    }

    res.innerHTML = `A: ${contador.a} | E: ${contador.e} | I: ${contador.i} | O: ${contador.o} | U: ${contador.u}`;
}