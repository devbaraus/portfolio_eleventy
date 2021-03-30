module.exports = {
  'files': [
    'instagram',
    'github',
    'linkedin',
    'arrow-up',
    'arrow-down',
    'twitter',
    'book-open',
    'mail', 'phone',
  ].map(i => `./feather/${i}.svg`),
  'fontName': 'feather',
  'classPrefix': 'feather-',
  'baseSelector': '.feather',
  'types': ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  'fileName': '[fontname].[ext]',
  'dest': '/css/',
}
