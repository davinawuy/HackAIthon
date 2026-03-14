import { useEffect, useMemo, useState } from 'react'

const BOOKMARK_KEY = 'cultural-buddy-bookmarks'

function loadInitialBookmarks() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = localStorage.getItem(BOOKMARK_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(loadInitialBookmarks)

  useEffect(() => {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks])

  function toggleBookmark(eventId) {
    setBookmarks((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    )
  }

  function isBookmarked(eventId) {
    return bookmarkSet.has(eventId)
  }

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  }
}
