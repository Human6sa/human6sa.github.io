(() => {
  const spaceArticle = () => {
    if (window.GLOBAL_CONFIG_SITE?.pageType !== 'post') return
    if (window.pangu && document.getElementById('article-container')) {
      // Preserve both the original TeX and MathJax's generated math nodes.
      const pangu = window.pangu
      const canIgnoreNode = pangu.canIgnoreNode
      pangu.canIgnoreNode = function (node) {
        const element = node.nodeType === 1 ? node : node.parentElement
        return canIgnoreNode.call(this, node) ||
          !!element?.closest('.math-tex, mjx-container, .MathJax')
      }
      try {
        pangu.spacingElementById('article-container')
      } finally {
        pangu.canIgnoreNode = canIgnoreNode
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', spaceArticle, { once: true })
  } else {
    spaceArticle()
  }

  document.addEventListener('pjax:complete', spaceArticle)
})()
