module.exports = (parser, platform) => {
  if (platform === 'cian_full' || platform === 'cian_commers' || platform === 'domclick'){
    return builderCianDomclick(parser);
  }
  if (platform === 'avito'){
    return builderAvito(parser);
  }
  if (platform === 'yandex' || platform === 'other'){
    return builderYandexOther(parser);
  }
  return []
}

const builderCianDomclick = (parser) => {
  if (parser?.feed?.object?.length > 0) {
    return parser?.feed?.object.map((item) => {
      return {
        id: item?.ExternalId?._text || '',
        description: item?.Description?._text || ''
      }
    })
  }
  return []
}

const builderAvito = (parser) => {
  if (parser?.Ads?.Ad?.length > 0) {
    return parser?.Ads?.Ad.map((item) => {
      return {
        id: item?.Id?._text || '',
        description: item?.Description?._cdata || ''
      }
    })
  }
  return []
}

const builderYandexOther = (parser) => {
  if (parser?.['realty-feed']?.offer?.length > 0) {
    return parser?.['realty-feed']?.offer.map((item) => {
      return {
        id: item?._attributes?.['internal-id'] || '',
        description: item?.description?._text || ''
      }
    })
  }
  return []
}