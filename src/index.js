import {saludar} from './js/componentes';
import './styles.css';

const nombre = 'Maxi';

saludar(nombre);


/**  Pasos para instalar webpack con npm:
 *   Ejecutamos el comando:
 *      npm init
 * 
 *      completamos los siguientes campos:
 *      package name: webpack-inicial o el que queramos
 *      version:(por defecto)
 *      description: la que queramos
 *      entry point: (index.js)
 *      test command:
 *      git repository:
 *      keywords:
 *      author: Maxi Ovelar
 *      license: (ISC)
 * 
 *      Damos enter y nos genera el package.json   
 * 
 *  
 *   
 *   Luego dentro de nuestro directorio webpack-inicial
 *      npm i webpack webpack-cli --save-dev
 *      esto además de instalar las dependencias webpack y webpack-cli
 *      nos genera el directorio node_modules
 * 
 *   
 *   
 *   En el package.json debajo de la línea "test", creamos un 
 *      nuevo script con la siguiente información 
 *      "build": "webpack" 
 *      guardamos los cambios
 * 
 *
 *   
 *   Siempre debemos colocar la palabra export delante del módulo que 
 *      queremos permitir que se pueda importar desde otro archivo y
 *      en el archivo que queremos importar ese módulo escribimos
 *      import y la referencia del módulo con la ruta de su archivo
 *      por ej: import {saludar} from './ja/componentes';
 *
 *
 *   
 *   Ejecutamos el comando:
 *      npm run build
 * 
 *      esto nos creará el directorio dist y dentro 
 *      de este el archivo main.js que es nuestro 'bundle'
 *      que contiene nuestra aplicación y todo lo necesario 
 *      para importar módulos y trabajar con módulos de manera segura
 * 
 * 
 *   
 *   El directorio dist va a ser el que vamos a subir a producción 
 *      Para que nuestro index.html se guarde siempre en la carpeta
 *      dist de forma automática debemos crear el archivo 
 *      webpack.config.js con la siguiente configuración:
 *  
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',
    module: {
        rules: [{

            test: /\.html$/i,
            loader: 'html-loader',
            options: {
                minimize: false
            },
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
    ]

}

 *
 *   Más adelante si quisieramos minify nuestro index.html para 
 *      subirlo a producción debemos cambiar el valor de 
 *      minimize por true y volvemos a ejecutar el comando 
 *      npm run build
 * 
 *   El main.js también puede mificarse si en lugar de mode: 'development',
 *      ponemos mode: 'production'
 * 
 *   
 * 
 *   Ejecutamos el comando npm: -D webpack-dev-server
 *      para instalar el servidor de desarrollo de webpack
 *      en el package.json creamos un nuevo script debajo de "build"
 *      con la siguiente información:
 *      "start": "webpack serve --open"
 *      Ejecutamos npm start
 *      
 *      (en caso de que dé un error de port, cambiamos nuestro script 
 *       por "start": "webpack serve --open --port=8081" o algún otro
 *       que tengamos disponible)
 *      
 *      Ahora ya estamos trabajando en nuestro local host y 
 *      guardando y actualizando los cambios automáticamente
 * 
 * 
 *   
 *   Para actualizar y cargar en nuestro bundle automáticamente nuestro
 *      archivo css debemos instalar css-loader y style-loader 
 *      Ejecutamos el comando: npm i -D css-loader style-loader
 * 
 *      Luego vamos a nuestro archivo componentes.js y de decimos que
 *      va a tener que importar nuestro archivo css con la línea
 *      import '../css/componentes.css';
 * 
 *   En nuestro archivo webpack.config.js agregamos la siguiente rule
 *      {

                test: /\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]

        },
 * 
 *
 *   Borramos la carpeta dist y volvemos a ejecutar
 *      npm run build
 *      ahora todas las importaciones de nuestro css las va a realizar
 *      el archivo main.js de forma dinámica
 * 
 * 
 * 
 *   Para crear una hoja de estilos global que quede de forma 
 *      independiente en el directorio src y que además se guarde
 *      y cargue de forma automática en el directorio dist y el 
 *      archivo index.html debemos crear en el src un archivo .css
 *      con los estilos que queramos que se apliquen a nuestra app de 
 *      manera global
 * 
 *      Luego ejecutamos los comandos:
 *      npm i -D mini-css-extract-plugin
 * 
 *      En el archivo webpack.config.js creamos la constante
 *      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 * 
 *      creamos la rule
 *          {

                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]

            },     
 *
 *
 *      En la rule anterior de css de arriba agregamos justo 
 *      debajo de 'test' la línea: exclude: /styles\.css$/,
 *      
 *      Luego en plugins agregamos:
 *      new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        })

        Por último ejecutamos npm run build

        Si queremos minify nuestro archivo de 
        estilos global debemos instalar otra 
        dependencia con el comando:
        npm i -D optimize-css-assets-webpack-plugin

        Lo importamos:
        const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
        y debajo de mode: agregamos la propiedad optimization:
        optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    }, 

    Siempre que en el webpack.config.js el mode: sea 'production'
    nuestro css global se va a guardar minificado, mientras que el 
    mode sea 'development' no lo va a minificar

 *
 *
 *   Para trabajar con imágenes debemos instalar el plugin copy-webpack 
 *      y agregar una rule al archivo webpack.config.js
 * 
 *      Entonces ejecutamos: npm i -D copy-webpack-plugin --save-dev
 *  
 *      Luego creamos la constante:
 *      const CopyPlugin = require('copy-webpack-plugin');
 * 
 *      Por último lo agregamos en la sección de los plugins:
 *      new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
 *
 *
 *      Luego ejecutamos npm run build y levantamos el servidor con
 *      npm start y ya debería estar funcionando
 * 
 * 
 * 
 *   Vamos a crear el archivo webpack.prod.js para utilizar cuando
 *      estemos trabajando en producción
 *      
 *
 * */


