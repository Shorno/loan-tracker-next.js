"use client"
import { useState, useEffect } from 'react'

interface DynamicProgressbarProps {
    startDate: string | undefined
    duration: number | undefined
    label: number | undefined
}

export default function DynamicProgressbar({ startDate, duration, label }: DynamicProgressbarProps) {
    const [remainingDays, setRemainingDays] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!startDate || !duration) return

        const updateProgress = () => {
            const start = new Date(startDate).getTime()
            const end = start + duration * 24 * 60 * 60 * 1000 // Convert days to milliseconds
            const now = new Date().getTime()
            const total = end - start
            const elapsed = now - start
            const remaining = Math.max(end - now, 0)
            const newProgress = Math.min(Math.max((elapsed / total) * 100, 0), 100)

            setProgress(newProgress)
            setRemainingDays(Math.ceil(remaining / (24 * 60 * 60 * 1000)))
        }

        updateProgress()
        const timer = setInterval(updateProgress, 60000) // Update every minute

        return () => clearInterval(timer)
    }, [startDate, duration])

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    if (!startDate || !duration) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-lg font-semibold mb-2 text-center">{label}</h2>
                <p className="text-center text-sm text-gray-500">Loan information not available</p>
            </div>
        )
    }

    const startDateObject = new Date(startDate)
    const endDateObject = new Date(startDateObject.getTime() + duration * 24 * 60 * 60 * 1000)

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="flex justify-between mb-1 text-sm">
                <span className={"text-xs"}>{formatDate(startDateObject)}</span>
                <span className={"text-xs"}>{formatDate(endDateObject)}</span>
            </div>
            <progress
                className="progress progress-success w-full"
                value={progress}
                max="100"
            ></progress>
            <div className="text-center mt-2 text-xs font-medium">
                {remainingDays} {remainingDays === 1 ? 'day' : 'days'} remaining
            </div>
        </div>
    )
}