const uri = `https://cloud-api${process.env.XLHB_SUFFIX}/passport/v3/`
const uri1 = `https://${window.location.host}`
const uri2 = process.env.XLHB_LOGIN_DOMAIN ? `https://${process.env.XLHB_LOGIN_DOMAIN}` : `https://www${process.env.XLHB_SUFFIX}`
export {uri, uri1, uri2}