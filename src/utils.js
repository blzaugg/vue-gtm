import pluginConfig from './config'

/**
 * Console log depending on config debug mode
 * @param {...*} message
 */
export const logDebug = function (message) {
  if (pluginConfig.debug) {
    console.log('VueGtm :', ...arguments)
  }
}

/**
 * Load GTM script tag
 * @param {String}  id                  GTM ID
 * @param {Object}  [queryParams={}]    GTM query string params
 */
export const loadScript = function (id, queryParams = {}) {
  const win    = window,
        doc    = document,
        script = doc.createElement('script'),
        dl     = 'dataLayer'

  win[dl] = win[dl] || []

  win[dl].push({
    event      :'gtm.js',
    'gtm.start': new Date().getTime(),
  })

  if (!id) {
    return
  }
  
  queryParams.id = id
  
  const queryEntries = Object.entries(queryParams)
  
  const queryString = queryEntries.map(([name, value]) => {
    return `${name}=${value}`
  })
  
  script.async = true;
  script.src   = `https://www.googletagmanager.com/gtm.js?${queryString.join('&')}`

  doc.body.appendChild(script)
}

/**
 * Check if GTM script is in the document
 * @return {boolean}
 */
export const hasScript = function () {
  return Array
    .from(document.getElementsByTagName('script'))
    .some(script => script.src.includes('googletagmanager'))
}
