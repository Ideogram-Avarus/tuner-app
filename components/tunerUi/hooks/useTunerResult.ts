import { useEffect } from 'react'
import { useTuner } from 'tuner'



export const useTunerResult = () => {
    const { 
        isRunning,
        start, 
        stop, 
        result,
        hasPermission 
    } = useTuner()

    useEffect(() => {
        if (!hasPermission) return
        
        start()
        
        return () => {
            stop()
        }
    }, [hasPermission])
        
    return {
        isRunning,
        start,
        stop,
        hasPermission,
        result
    }
}