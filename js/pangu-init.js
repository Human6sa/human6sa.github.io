(() => {
  const spaceArticle = () => {
    if (window.GLOBAL_CONFIG_SITE?.pageType !== 'post') return
    if (window.pangu && document.getElementById('article-container')) {
      window.pangu.spacingElementById('article-container')
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', spaceArticle, { once: true })
  } else {
    spaceArticle()
  }

  document.addEventListener('pjax:complete', spaceArticle)
})()
