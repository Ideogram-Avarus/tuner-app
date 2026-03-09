import { Circle, Line, Path } from "react-native-svg"

interface NeedleSVGprops {
    cx: number
    cy: number
    needleLength: number
    color: string
}


export const NeedleSVG = ({
    cx,
    cy,
    needleLength,
    color,
} : NeedleSVGprops
) => {
    return (
        <>
        <Line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - needleLength}
            stroke={color}
            strokeWidth={6.5}
            strokeLinecap="round"
        />
        <Circle cx={cx} cy={cy - needleLength + 6} r={5.5} fill={color} />
        <Path
            d={`
            M ${cx} ${cy - needleLength}
            L ${cx - needleLength*0.08} ${cy - needleLength * 0.9}
            L ${cx} ${cy - needleLength * 1.05}
            L ${cx + needleLength*0.08} ${cy - needleLength * 0.9}
            Z
            `}
            fill={color}
                />
        </>
    )
}