const axios = require( 'axios' )
const Cache = require( 'node-persist' );
const cache = Cache.create( { dir: '/tmp/', ttl: 300000 } );
const fs = require( 'fs' )
const ef = require( 'empty-folder' )
const debug = require( 'debug' )( 'nuxt:generate' )

const config = require('../utils/config');
const apiUrl = config.apiUrl;
const baseUrl = config.baseUrl;

module.exports = function () {
	this.nuxt.hook('generate:before', async ( generator ) => {
		const routes = async () => {
            ef( generator.nuxt.options.generate.apiCacheDir, false, ( feedback ) => {
                if ( ! feedback.error ) {
                    debug( 'Stale API cache removed' )
                }
            } )

            const pages = axios
            .get(`${apiUrl}/api/page`)
            .then(res => {
                res.data.map(page => {
                    let name = page.post_link.replace(baseUrl, '');
                    name = name.replace(/\//g, '-_-');
                    name = name.replace(/\\/g, '-_-');
                    const path = (generator.nuxt.options.generate.apiCacheDir + '/' + name + '.json');
                    fs.writeFile( path, JSON.stringify(page) , ( err ) => {
                        if ( err ) throw err;
                    } )
                });
            });
		}
		await routes()
	} )
}