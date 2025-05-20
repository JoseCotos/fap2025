import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private readonly http: HttpClient
  ) { }

  validar_login(data: any){
    return this.http.post("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/login", data, {responseType: "json"})
  }

  listar_medicos(){
    return this.http.get("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/medicos",{responseType: "json"})
  }

  listar_especialidad_por_medico(param: string){
    return this.http.get("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/especialidad?id_medico=" + param, {responseType: "json"})
  }

  listar_disponibilidad_fecha(param: string){
    return this.http.get("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/fap_medico_disponibilidad_get?id_medico=" + param, {responseType: "json"})
  }

  listar_disponibilidad_hora(idMedico: string, fecha: string){
    return this.http.get("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/fap_medico_disponibilidad_hora_get?id_medico=" + idMedico + "&fecha=" + fecha, {responseType: "json"})
  }


}
