""" ================= """
""" fap_usuario_login """
""" ================= """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:
        tipo_documento = event.get('tipo_documento')
        numero_documento = event.get('numero_documento')
        clave_hash = event.get('clave_hash')
        params = (tipo_documento, numero_documento, clave_hash)
        
        cursor.execute('exec usp_usuario_login @tipo_documento=?, @numero_documento=?, @clave_hash=?', params)
        
        data = []

        for row in cursor:
            data.append({"id_usuario":row[0],"id_paciente":row[1],"nombre":row[2], "apellido":row[3] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()
 
 """ TEST """
 {
  "tipo_documento": "DNI",
  "numero_documento": "45678901",
  "clave_hash": "hash123ana"
}


""" =============== """
""" fap_medicos_get """
""" =============== """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:        
        cursor.execute('exec usp_ListarMedicos')
        
        data = []

        for row in cursor:
            data.append({"id_medico":row[0], "id_especialidad": row[1],"especialidad":row[2],"nombre":row[3], "apellido":row[4] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()


""" ==================== """
""" fap_especialidad_get """
""" ==================== """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:
        id_medico = event.get('id_medico')
        params = (id_medico)

        cursor.execute('exec usp_ListarEspecialidad_x_Medico @ID_MEDICO=?',params)
        
        data = []

        for row in cursor:
            data.append({"id_especialidad":row[0], "nombre": row[1],"descripcion":row[2] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()

""" 
    Recursos -> /especialidad -> Get -> Solicitud de integración -> Editar

    En plantilla de asignación colocar:
{
    "idmedico": "$input.params('idmedico')"
}
"""

""" ============================= """
""" fap_medico_disponibilidad_get """
""" ============================= """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:
        id_medico = event.get('id_medico')
        params = (id_medico)

        cursor.execute('exec usp_ListarFechaDisponible_Medico_Especialidad @ID_MEDICO=?',params)
        
        data = []

        for row in cursor:
            data.append({"fecha":row[0] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()

""" 
    Recursos -> /especialidad -> Get -> Solicitud de integración -> Editar

    En plantilla de asignación colocar: application/json
{
    "id_medico": "$input.params('id_medico')"
}
"""

""" ================================== """
""" fap_medico_disponibilidad_hora_get """
""" ================================== """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:
        id_medico = event.get('id_medico')
        fecha = event.get('fecha')
        params = (id_medico, fecha)

        cursor.execute('exec usp_ListarHoraDisponible_Fecha_Medico @ID_MEDICO=?, @FECHA=?',params)
        
        data = []

        for row in cursor:
            data.append({"hora":row[0] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()

""" 
    Recursos -> /especialidad -> Get -> Solicitud de integración -> Editar

    En plantilla de asignación colocar: application/json
{
    "id_medico": "$input.params('id_medico')",
    "fecha": "$input.params('fecha')"
}
"""


""" ============= """
""" fap_cita_post """
""" ============= """

import json
import pyodbc

def lambda_handler(event,context):
    try:
    
        conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                        "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                        "Database=DBFAP;"
                        "UID=admin;"
                        "PWD=$Jacc.78;")
        
        cursor = conn.cursor()

        id_cita = event.get('id_cita')
        id_paciente = event.get('id_paciente')
        id_medico = event.get('id_medico')
        fecha = event.get('fecha')
        hora = event.get('hora')
        estado = event.get('estado')
        motivo = event.get('motivo')
        
        print('llego : '+id_cita+id_paciente+id_medico+fecha+hora+estado+motivo)

        
        if not all([id_cita, id_paciente, id_medico, fecha, hora, estado, motivo]):
            return {
                'statusCode': 400,
                'body': json.dumps({'msg': 'Faltan campos requeridos'})
            }


        params = (id_cita, id_paciente, id_medico, fecha, hora, estado, motivo)

        cursor.execute('exec usp_insertar_cita @ID_CITA=?, @ID_PACIENTE=?, @ID_MEDICO=?, @FECHA=?, @HORA=?, @ESTADO=?, @MOTIVO=?',params)
        conn.commit()

        return {
            'statusCode': 200,
            'body': json.dumps({'msg': 'Registro creado correctamente'})
        }
    except Exception as e:
        return {
            #'msg': 'Error al registrar los datos'
            #'msg': str(id_cita) + ' - ' + str(id_paciente) + ' - ' + str(id_medico) + ' - ' + str(fecha) + ' - ' + str(hora) + ' - ' + str(estado) + ' - ' + str(motivo)
            
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

    finally:
        try:
            cursor.close()
            conn.close()
        except:
            pass


""" ====================== """
""" fap_especialidades_get """
""" ====================== """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:        
        cursor.execute('exec usp_ListarEspecialidades')
        
        data = []

        for row in cursor:
            data.append({"id_especialidad":row[0], "nombre": row[1],"descripcion":row[2] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()


""" ==================== """
""" fap_medico_get """
""" ==================== """

import json
import pyodbc 

def lambda_handler(event,context):
    conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};"
                      "Server=upc-dbweb.cyphf9v7gxq3.us-east-1.rds.amazonaws.com;"
                      "Database=DBFAP;"
                      "UID=admin;"
                      "PWD=$Jacc.78;")
    
    cursor = conn.cursor()
    try:
        id_especialidad = event.get('id_especialidad')
        params = (id_especialidad)

        cursor.execute('exec usp_ListarMedicos_x_Especilidad @ID_ESPECIALIDAD=?',params)
        
        data = []

        for row in cursor:
            data.append({"id_medico":row[0], "nombre": row[1],"apellido":row[2] })

        return {
            'data': data
        }
    except:
        return {
            'error': 'Error al obtener los datos'
        }

    finally:
        cursor.close()
        conn.close()

""" 
    Recursos -> /especialidad -> Get -> Solicitud de integración -> Editar

    En plantilla de asignación colocar: application/json
{
    "id_especialidad": "$input.params('id_especialidad')"
}
"""
