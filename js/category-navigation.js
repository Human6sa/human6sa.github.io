(() => {
  'use strict'

  const disclosure = '[data-category-disclosure]'
  const trigger = '[data-category-toggle]'
  const pinKey = 'butterfly-category-sidebar-pinned'
  const timers = new WeakMap()
  let sidebarPinned = false
  try {
    sidebarPinned = sessionStorage.getItem(pinKey) === 'true'
  } catch {}

  const panelFor = toggle => toggle.closest(disclosure)?.querySelector('[data-category-panel]')
  const expanded = () => document.querySelectorAll(`${trigger}[aria-expanded="true"]`)
  const cancelClose = toggle => clearTimeout(timers.get(toggle))
  const isPinned = toggle => toggle.getAttribute('aria-pressed') === 'true'

  const setOpen = (toggle, open) => {
    cancelClose(toggle)
    const panel = panelFor(toggle)
    if (!panel || panel.inert === !open) return

    panel.inert = !open
    toggle.setAttribute('aria-expanded', String(open))

    if (open) {
      const tabs = panel.querySelector('.category-tabs')
      const active = tabs?.querySelector('[aria-current]')
      if (active && tabs.scrollWidth > tabs.clientWidth) {
        const tab = active.getBoundingClientRect()
        const viewport = tabs.getBoundingClientRect()
        if (tab.left < viewport.left || tab.right > viewport.right) {
          tabs.scrollLeft += tab.left - viewport.left - (viewport.width - tab.width) / 2
        }
      }
    }
  }

  const setPinned = (toggle, pinned) => {
    toggle.setAttribute('aria-pressed', String(pinned))
    toggle.title = pinned ? '取消固定分类侧栏' : '固定分类侧栏'
    sidebarPinned = pinned
    try {
      if (pinned) sessionStorage.setItem(pinKey, 'true')
      else sessionStorage.removeItem(pinKey)
    } catch {}
  }

  const restoreSidebarPin = () => {
    const toggle = document.querySelector('.category-sidebar-toggle')
    if (!toggle || !sidebarPinned) return
    setPinned(toggle, true)
    setOpen(toggle, true)
  }

  const closeSoon = toggle => {
    if (isPinned(toggle)) return
    cancelClose(toggle)
    timers.set(toggle, setTimeout(() => {
      if (!isPinned(toggle)) setOpen(toggle, false)
    }, 150))
  }

  const findDisclosure = event => event.target.closest(disclosure)
  const hasKeyboardFocus = region => region.contains(document.activeElement) &&
    document.activeElement.matches(':focus-visible')

  document.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse') return
    const region = findDisclosure(event)
    if (region && !region.contains(event.relatedTarget)) setOpen(region.querySelector(trigger), true)
  })

  document.addEventListener('pointerout', event => {
    if (event.pointerType !== 'mouse') return
    const region = findDisclosure(event)
    if (region && !region.contains(event.relatedTarget) && !hasKeyboardFocus(region)) {
      closeSoon(region.querySelector(trigger))
    }
  })

  document.addEventListener('focusin', event => {
    const region = findDisclosure(event)
    if (region && event.target.matches(':focus-visible')) setOpen(region.querySelector(trigger), true)
  })

  document.addEventListener('focusout', event => {
    const region = findDisclosure(event)
    if (region && !region.contains(event.relatedTarget) && !region.matches(':hover')) {
      closeSoon(region.querySelector(trigger))
    }
  })

  document.addEventListener('click', event => {
    for (const toggle of expanded()) {
      if (!isPinned(toggle) && !toggle.closest(disclosure).contains(event.target)) setOpen(toggle, false)
    }
    const branch = event.target.closest('[data-category-branch-toggle], [data-category-branch-link]')
    if (branch) {
      const button = branch.closest('.category-sidebar-row').querySelector('[data-category-branch-toggle]')
      const list = document.getElementById(button.getAttribute('aria-controls'))
      if (list) {
        const open = branch !== button || button.getAttribute('aria-expanded') === 'false'
        button.setAttribute('aria-expanded', String(open))
        list.hidden = !open
      }
      return
    }

    const toggle = event.target.closest(trigger)
    if (!toggle) return

    if (toggle.hasAttribute('aria-pressed')) {
      const pinned = !isPinned(toggle)
      const region = toggle.closest(disclosure)
      setPinned(toggle, pinned)
      setOpen(toggle, pinned || region.matches(':hover') || hasKeyboardFocus(region))
    } else {
      setOpen(toggle, toggle.getAttribute('aria-expanded') === 'false')
    }
  })

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return
    for (const toggle of expanded()) {
      if (isPinned(toggle)) setPinned(toggle, false)
      if (panelFor(toggle)?.contains(document.activeElement)) toggle.focus()
      setOpen(toggle, false)
    }
  })

  document.addEventListener('pjax:send', () => {
    for (const toggle of expanded()) {
      if (!isPinned(toggle)) setOpen(toggle, false)
    }
  })

  document.addEventListener('pjax:complete', restoreSidebarPin)
  restoreSidebarPin()
})()
