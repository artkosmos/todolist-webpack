import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>
export const DeleteIcon = ({ ...rest }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_23657_3701)">
        <path
          d="M14 4H10.6667V2.88666C10.6511 2.45988 10.4668 2.0567 10.1544 1.76553C9.842 1.47435 9.42687 1.31893 9.00004 1.33333H7.00004C6.57321 1.31893 6.15808 1.47435 5.84566 1.76553C5.53324 2.0567 5.34901 2.45988 5.33337 2.88666V4H2.00004C1.82323 4 1.65366 4.07024 1.52864 4.19526C1.40361 4.32028 1.33337 4.48985 1.33337 4.66666C1.33337 4.84348 1.40361 5.01305 1.52864 5.13807C1.65366 5.26309 1.82323 5.33333 2.00004 5.33333H2.66671V12.6667C2.66671 13.1971 2.87742 13.7058 3.25249 14.0809C3.62757 14.456 4.13627 14.6667 4.66671 14.6667H11.3334C11.8638 14.6667 12.3725 14.456 12.7476 14.0809C13.1227 13.7058 13.3334 13.1971 13.3334 12.6667V5.33333H14C14.1769 5.33333 14.3464 5.26309 14.4714 5.13807C14.5965 5.01305 14.6667 4.84348 14.6667 4.66666C14.6667 4.48985 14.5965 4.32028 14.4714 4.19526C14.3464 4.07024 14.1769 4 14 4ZM6.66671 2.88666C6.66671 2.78 6.80671 2.66666 7.00004 2.66666H9.00004C9.19337 2.66666 9.33337 2.78 9.33337 2.88666V4H6.66671V2.88666ZM12 12.6667C12 12.8435 11.9298 13.013 11.8048 13.1381C11.6798 13.2631 11.5102 13.3333 11.3334 13.3333H4.66671C4.4899 13.3333 4.32033 13.2631 4.1953 13.1381C4.07028 13.013 4.00004 12.8435 4.00004 12.6667V5.33333H12V12.6667Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_23657_3701">
          <rect width="16" height="16" fill="black" />
        </clipPath>
      </defs>
    </svg>
  )
}
