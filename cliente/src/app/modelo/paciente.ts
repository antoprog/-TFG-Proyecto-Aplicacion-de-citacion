export interface Paciente {
    nombre: String
    apellido1: String;
    apellido2: String;
    tipo_doc: String;
    documento: String;
    fecha_nacimiento:Date;
    telefono: String;
    email: String;
    direccion: [
        {
            tipo_calle:{
                cod:Number;
                nombre:String
            },
            calle:String;
            cod_postal:String;
            ciudad:String;
            provincia:String;
            pais:String;
            usu:String;
            f_usu:Date;
            acion_usu:String
        }
    ],
    aseguradora: [String],
    company:String;
    numero_historia:String;
    contacto:[
        {
            nombre: String;
            telefono: String;
            usu:String;
            f_usu:Date;
            acion_usu:String
        }
    ],
    permiso_grabacion:{type:Boolean},
    firma_proteccion_datos:{type:Boolean},
    historial:[
        {
            antecendentes:[{
                familiares:[{
                    observaciones:String;
                    usu:String;
                    f_usu:Date;
                    acion_usu:String
                }],
                personales:[{
                    observaciones:String;
                    usu:String;
                    f_usu:Date;
                    acion_usu:String
                }]
            }],
            valoracion:[
                {
                    procedencia:String;
                    fecha_inicio:Date;
                    fecha_alta:Date;
                    psicologo:String;
                    motivo_consulta:String;
                    sintomas:String;
                    usu:String;
                    f_usu:Date;
                    acion_usu:String;
                            
                    diagnostico_medico:[
                        {
                            patologia_medica:String;
                            fecha_diagnostico:Date;
                            tratamiento:[{
                                medicamento:String;
                                fechaInicio:Date;
                                fechaFin:Date;
                                posologia:{
                                    desayuno:Number;
                                    comida:Number;
                                    cena:Number;
                                    otros:{type: Number}
                                },
                                observaciones:String
                            }],
                            usu:String;
                            f_usu:Date;
                            acion_usu:String                  
                        },
                    ],
                    test_diagnosticos: [
                        {   
                            cognitiva:[{
                                fecha_valoracion:Date;
                                observaciones:String;
                                usu:String;
                                f_usu:Date;
                                acion_usu:String 
                            }],
                            emocional:[{
                                fecha_valoracion:Date;
                                observaciones:String;
                                usu:String;
                                f_usu:Date;
                                acion_usu:String
                            }],
                            pruebasPsicodiagnostico:[{
                                fecha_prueba:Date;
                                observaciones:String;
                                usu:String;
                                f_usu:Date;
                                acion_usu:String
                            }]

                        }
                
                    ],
                    diagnostico_psicologico:[
                        {
                            diagnostico:String;
                            fecha_diagnostico:Date;
                            observaciones_personales:String;
                            usu:String;
                            f_usu:Date;
                            acion_usu:String
                        }
                    ],   
                    seguimiento: [
                        {   
                            fecha_cita:Date;
                            hora_inicio_cita:String;
                            hora_fin_cita:String;
                            observaciones:String;
                            fecha_prox_cita:Date;
                            hora_prox_cita:String;
                            conducta_a_seguir:String;
                            usu:String;
                            f_usu:Date;
                            acion_usu:String  
                        }
                    ]
                }   
            
            ]
        }
    ]
}
