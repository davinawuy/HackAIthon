import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  translationLanguages,
  translateTextBatch,
} from '../lib/translation/service'
import { TranslationContext } from './TranslationContext'

const CACHE_STORAGE_KEY = 'common-ground-translation-cache'
const TEXT_BATCH_SIZE = 24
const ATTRIBUTE_NAMES = ['placeholder', 'aria-label', 'title']

function hasReadableContent(text) {
  return /[A-Za-z]/.test(text)
}

function shouldSkipElement(element) {
  if (!element) return true

  if (element.closest('[data-no-translate="true"]')) {
    return true
  }

  return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'OPTION'].includes(
    element.tagName
  )
}

function getNodeOriginal(node) {
  if (!node.__cgOriginalText) {
    node.__cgOriginalText = node.textContent
  }

  return node.__cgOriginalText
}

function getAttributeOriginal(element, attributeName) {
  const storeKey = `cgOriginal${attributeName.replace(/(^|-)(\w)/g, (_, __, char) =>
    char.toUpperCase()
  )}`

  if (!element.dataset[storeKey]) {
    element.dataset[storeKey] = element.getAttribute(attributeName) || ''
  }

  return element.dataset[storeKey]
}

function loadCache() {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    return JSON.parse(window.localStorage.getItem(CACHE_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function persistCache(cache) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache))
}

async function translateChunks(entries, languageLabel, cacheRef) {
  for (let index = 0; index < entries.length; index += TEXT_BATCH_SIZE) {
    const batch = entries.slice(index, index + TEXT_BATCH_SIZE)
    const translations = await translateTextBatch(
      batch.map((item) => item.original),
      languageLabel
    )

    batch.forEach((item, itemIndex) => {
      cacheRef.current[item.cacheKey] = translations[itemIndex]
    })

    persistCache(cacheRef.current)
  }
}

function applyTextTranslation(languageCode, cacheRef) {
  const root = document.body

  if (!root) return Promise.resolve()

  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent?.trim()

      if (!text || !hasReadableContent(text)) {
        return NodeFilter.FILTER_REJECT
      }

      if (shouldSkipElement(node.parentElement)) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes = []

  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode)
  }

  const attributeEntries = []

  document.querySelectorAll('[placeholder], [aria-label], [title]').forEach((element) => {
    if (shouldSkipElement(element)) return

    ATTRIBUTE_NAMES.forEach((attributeName) => {
      const current = element.getAttribute(attributeName)

      if (!current || !hasReadableContent(current)) {
        return
      }

      attributeEntries.push({
        element,
        attributeName,
        original: getAttributeOriginal(element, attributeName),
      })
    })
  })

  if (languageCode === 'en') {
    textNodes.forEach((node) => {
      const original = getNodeOriginal(node)
      if (node.textContent !== original) {
        node.textContent = original
      }
    })

    attributeEntries.forEach(({ element, attributeName, original }) => {
      if (element.getAttribute(attributeName) !== original) {
        element.setAttribute(attributeName, original)
      }
    })

    return Promise.resolve()
  }

  const languageLabel =
    translationLanguages.find((language) => language.code === languageCode)?.label ||
    languageCode

  const pending = new Map()

  textNodes.forEach((node) => {
    const original = getNodeOriginal(node)
    const cacheKey = `${languageCode}::text::${original}`

    if (!cacheRef.current[cacheKey]) {
      pending.set(cacheKey, { original, cacheKey })
    }
  })

  attributeEntries.forEach(({ original }) => {
    const cacheKey = `${languageCode}::attr::${original}`

    if (!cacheRef.current[cacheKey]) {
      pending.set(cacheKey, { original, cacheKey })
    }
  })

  return translateChunks([...pending.values()], languageLabel, cacheRef).then(() => {
    textNodes.forEach((node) => {
      const original = getNodeOriginal(node)
      const translated = cacheRef.current[`${languageCode}::text::${original}`]

      if (translated && node.textContent !== translated) {
        node.textContent = translated
      }
    })

    attributeEntries.forEach(({ element, attributeName, original }) => {
      const translated = cacheRef.current[`${languageCode}::attr::${original}`]

      if (translated && element.getAttribute(attributeName) !== translated) {
        element.setAttribute(attributeName, translated)
      }
    })
  })
}

export function TranslationProvider({ children }) {
  const location = useLocation()
  const [language, setLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const cacheRef = useRef(loadCache())

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    let cancelled = false

    async function runTranslation() {
      setIsTranslating(language !== 'en')

      try {
        await applyTextTranslation(language, cacheRef)
      } catch (error) {
        console.error('Page translation failed:', error)
      } finally {
        if (!cancelled) {
          setIsTranslating(false)
        }
      }
    }

    const timerId = window.setTimeout(() => {
      runTranslation()
    }, 80)

    return () => {
      cancelled = true
      window.clearTimeout(timerId)
    }
  }, [language, location.pathname])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isTranslating,
      languages: translationLanguages,
    }),
    [isTranslating, language]
  )

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}
