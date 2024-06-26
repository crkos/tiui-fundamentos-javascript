const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const mortAndRickApi = 'https://rickandmortyapi.com/api/character/';
const xmlHttpRequest = new XMLHttpRequest();

/* El primer problema basicamente era un error donde no se estaba parseando el JSON correctamente
Se mandaba el xmlHttpRequest.responseText como un string y no como un objeto JSON
tambien el estatus que mandaba xmlHttpRequest.status no era el correcto, era tipo number
pero se esta comparando como texto
*/

/**
 * Función que realiza una petición a una API
 * y retorna una promesa con la respuesta
 * @param urlApi {string}
 * @returns Promise<T>
 *   Retorna una promesa con la respuesta de la API
 * @throws Error
 *  Lanza un error si la petición falla
 *  @example
 *  fetchAllData<Character>('https://rickandmortyapi.com/api/character/1');
 */
const fetchAllData = (urlApi) => {
  return new Promise((resolve, reject) => {
    xmlHttpRequest.onreadystatechange = (_) => {
      if (xmlHttpRequest.readyState === 4) {
        if (xmlHttpRequest.status === 200) {
          resolve(JSON.parse(xmlHttpRequest.responseText));
        } else {
          // Podemos lanzar un error mas estructurado o extender el error pero creo que se entiende
          reject(new Error(`Solicitud ha falldo con el estatus ${xmlHttpRequest.status}`));
        }
      }
    };
    xmlHttpRequest.open('GET', urlApi, true);
    xmlHttpRequest.send();
  });
};


/**
 * Función que realiza las peticiones a la API
 * y muestra en consola la información solicitada
 * @function getResponseApi
 * @param urlAPi {string}
 * @returns Promise<void>
 *   Retorna una promesa vacía
 *   @example
 *   getResponseApi('https://rickandmortyapi.com/api/character/1');
 */
const getResponseApi = async (urlAPi) => {
  try {
    const data = await fetchAllData(urlAPi);
    console.log("Primer llamado...");
    const characterInfo = await fetchAllData(data.results[0].url);
    console.log("Segundo llamado...");
    const originInfo = await fetchAllData(characterInfo.origin.url);
    console.log("Tercer llamado...");
    console.log(`Personajes ${data.info.count}`);
    console.log(`Primer Personaje: ${characterInfo.name}`);
    console.log(`Dimensión: ${originInfo.name}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

(async () => {
  await getResponseApi(mortAndRickApi);
})();
