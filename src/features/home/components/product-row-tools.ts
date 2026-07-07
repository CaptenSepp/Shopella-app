const activeScrollFrames = new WeakMap<HTMLDivElement, number>()

const getCardScrollLeft = (scrollElement: HTMLDivElement, cardElement: HTMLElement) => {
  const cardRect = cardElement.getBoundingClientRect()
  const containerRect = scrollElement.getBoundingClientRect()
  return cardRect.left - containerRect.left + scrollElement.scrollLeft
}

export const animateScrollLeft = (
  scrollElement: HTMLDivElement,
  targetLeft: number,
  durationMs = 400,
) => {
  const activeFrame = activeScrollFrames.get(scrollElement)
  if (activeFrame !== undefined) window.cancelAnimationFrame(activeFrame)

  const startLeft = scrollElement.scrollLeft // Read the current position once at the start.
  const distanceLeft = targetLeft - startLeft
  scrollElement.style.scrollSnapType = "none" // Stop CSS snap fighting the JS animation.
  if (Math.abs(distanceLeft) < 1) {
    scrollElement.style.scrollSnapType = "x mandatory"
    activeScrollFrames.delete(scrollElement)
    return
  }

  const startTime = performance.now() // Use time-based animation so it stays smooth.
  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

  const step = (currentTime: number) => {
    const elapsedMs = currentTime - startTime
    const progress = Math.min(1, elapsedMs / durationMs)
    scrollElement.scrollLeft = startLeft + distanceLeft * easeOutCubic(progress)
    if (progress < 1) {
      activeScrollFrames.set(scrollElement, window.requestAnimationFrame(step))
      return
    }
    scrollElement.style.scrollSnapType = "x mandatory"
    activeScrollFrames.delete(scrollElement)
  }

  activeScrollFrames.set(scrollElement, window.requestAnimationFrame(step))
}

export const getCardTargetLeft = (
  scrollElement: HTMLDivElement,
  direction: -1 | 1,
  cardSelector = ".best-row__card",
) => {
  const cardElements = Array.from(scrollElement.querySelectorAll<HTMLElement>(cardSelector))
  if (cardElements.length === 0) return null

  const currentScrollLeft = scrollElement.scrollLeft
  const currentCardIndex = cardElements.findIndex(
    (cardElement) => getCardScrollLeft(scrollElement, cardElement) >= currentScrollLeft - 4,
  )
  const safeCurrentIndex = currentCardIndex >= 0 ? currentCardIndex : 0
  const targetIndex = Math.max(
    0,
    Math.min(cardElements.length - 1, safeCurrentIndex + direction),
  )

  const targetCard = cardElements[targetIndex]
  return targetCard ? getCardScrollLeft(scrollElement, targetCard) : 0
}

export const getNearestCardLeft = (
  scrollElement: HTMLDivElement,
  cardSelector = ".best-row__card",
) => {
  const cardElements = Array.from(scrollElement.querySelectorAll<HTMLElement>(cardSelector))
  if (cardElements.length === 0) return null

  const nearestCardElement = cardElements.reduce((closestCardElement, currentCardElement) =>
    Math.abs(getCardScrollLeft(scrollElement, currentCardElement) - scrollElement.scrollLeft) <
    Math.abs(getCardScrollLeft(scrollElement, closestCardElement) - scrollElement.scrollLeft)
      ? currentCardElement
      : closestCardElement
  )

  return getCardScrollLeft(scrollElement, nearestCardElement)
}
