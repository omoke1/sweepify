import { useEffect, useMemo, useState } from 'react'
import { eventLog, simulationSteps } from '../data/scenario'

export function useSimulation() {
  const [stepIndex, setStepIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current === simulationSteps.length - 1) {
          setIsAutoPlaying(false)
          return current
        }

        return current + 1
      })
    }, 2400)

    return () => window.clearInterval(timer)
  }, [isAutoPlaying])

  const step = simulationSteps[stepIndex]
  const progress = ((stepIndex + 1) / simulationSteps.length) * 100

  const timelineEvents = useMemo(() => {
    const total = Math.min(stepIndex + 1, eventLog.length)
    return eventLog.slice(0, total)
  }, [stepIndex])

  const stats = useMemo(
    () => [
      { label: 'Treasury size', value: step.treasury },
      { label: 'In yield', value: step.yield },
      { label: 'Deployed crosschain', value: step.deployed },
      { label: 'Health factor', value: step.health },
    ],
    [step],
  )

  const next = () => {
    setStepIndex((current) => (current === simulationSteps.length - 1 ? 0 : current + 1))
  }

  const reset = () => {
    setIsAutoPlaying(false)
    setStepIndex(0)
  }

  const jumpTo = (index: number) => {
    setIsAutoPlaying(false)
    setStepIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying((current) => !current)
  }

  return {
    step,
    stepIndex,
    steps: simulationSteps,
    progress,
    stats,
    timelineEvents,
    isAutoPlaying,
    next,
    reset,
    jumpTo,
    toggleAutoPlay,
  }
}
