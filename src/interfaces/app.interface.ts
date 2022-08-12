import { ReactElement, ReactNode } from "react"

export interface DoctorIdProps{
    id: string
}

interface DoctorAdressProps{
    district?: string,
    line_1?: string,
    line_2?: string
} 

export interface DoctorTimeProps{
    day?: string,
    start?: number,
    end?: string,
    isClosed?: boolean
} 

export interface DoctorProps{
    id: string,
    name: string,
    description?: string,
    address?: DoctorAdressProps,
    opening_hours?: Array<keyof DoctorTimeProps>
    source?: string
}

export interface BookingProps{
    id: string,
    name: string | null,
    start: number,
    doctorId: string,
    date: string | null,
    status: string,
    doctorName?: string,
    action?: (data: BookingProps) => void
}

export interface DateProps{
    text: string,
    value: string,
    isClosed?: boolean,
    date: string,
    times: string[]
}

export interface UserLoginProps{
    username: string,
    password: string,
    name?: string,
    logged?: boolean
}

export interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}

export interface PathProps{
    path: string,
    search?: string
    doctor?: DoctorProps
}

export interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

export interface NavItemProps {
    label: string;
    subLabel?: string;
    children?: Array<NavItemProps>;
    href?: string;
}