import {BookingProps, UserLoginProps} from '../interfaces/app.interface'
import DoctorData from './../dummy/doctors.json'
import AppointmentData from './../dummy/appointments.json'

export class AppService {
    public async getDoctors(): Promise<any> {
        let result:Object
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'doctor', {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : ''
                }
            });
            result = response.json()
        } catch (error) {
            result = DoctorData
        }
        
        return await result
    }

    public async getDoctorById(doctorId: string): Promise<any> {
        let result:Object
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'doctor/'+doctorId, {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : ''
                }
            });
    
            result = response.json()
        } catch (error) {
            let data = DoctorData.filter(x=>x.id === doctorId)
            result = data.length > 0 ? data[0] : {}
        }

        return await result
    }

    public async bookDoctor(param: BookingProps): Promise<any> {
        let result:Object
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'booking', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : ''
                },
                body: JSON.stringify(param)
            })
            result = response.json();
        } catch (error) {
            result = {
                id: "",
                name: "",
                start: 0,
                doctorId: "",
                date: "",
                status: "",
                doctorName: ""
            }
        }
        
        return await result
    }

    public async getAppointment(): Promise<any> {
        let result:Object
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'booking', {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : ''
                }
            });
            result = response.json()
        } catch (error) {
            result = AppointmentData
        }
        
        return await result
    }

    public async updateAppointment(param: BookingProps): Promise<any>{
        let result:Object
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'booking/'+param.id, {
                method: 'PATCH',
                headers: {
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : '',
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    id: param.id,
                    name: param.name,
                    start: param.start,
                    doctorId: param.doctorId,
                    date: param.date,
                    status: param.status
                })
            });
    
            result = response.json()
        } catch (error) {
            result = {
                id: "",
                name: "",
                start: 0,
                doctorId: "",
                date: "",
                status: "",
                doctorName: ""
            }
        }

        return await result
    }

    public async login(userInfo: UserLoginProps){
        let result = {
            ok: true,
            username: "patient",
            password: "12345",
            name: "Patient Name",
            message: ""
        }

        if(userInfo.username !== result.username || userInfo.password !== result.password){
            result.ok = false
            result.message = "Username or password is incorrect."
            localStorage.removeItem('auth')
        }else{
            let auth: UserLoginProps = {
                username: result.username,
                password: result.password,
                name: result.name,
                logged: true
            }
            localStorage.setItem('auth', JSON.stringify(auth))
        }

        return await result
    }

    public async logout(){
        let result = {
            ok: true
        }

        try {
            localStorage.removeItem('auth')
        } catch (error) {
            result.ok = false
        }

        return await result
    }
}