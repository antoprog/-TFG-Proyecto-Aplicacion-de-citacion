const mongoose = require('mongoose');

const DatosSchema = mongoose.Schema({
        nombre: {type: String},
        apellido1: {type: String},
        apellido2: {type: String},
        tipo_doc: {type: String},
        documento: {type: String},
        fecha_nacimiento:{type: Date},
        telefono: {type: String},
        email: {type: String},
        direccion: [
            {
                tipo_calle:{type: String},
                calle:{type: String},
                numero:{type: Number},
                bloque:{type: String},
                escalera:{type: String},
                piso:{type: String},
                letra:{type: String},
                cod_postal:{type: String},
                ciudad:{ type: String},
                provincia:{ type: String},
                pais:{type: String},
                usu:{type: String},
                f_usu:{type: Date},
                acion_usu:{type: String}
            }
        ],
        aseguradora: [{type: String}],
        numeroHistoria:{type: String},
        contacto:[
            {
                nombre: {type: String},
                telefono: {type: String},
                usu:{type: String},
                f_usu:{type: Date},
                acion_usu:{type: String}
            }
        ],
        permisoGrabacion:{type:Boolean},
        firmaProteccionDatos:{type:Boolean},
        historial:[
            {
                antecendentes:[{
                    familiares:[{
                        observaciones:{type:String},
                        usu:{type: String},
                        f_usu:{type: Date},
                        acion_usu:{type: String}
                    }],
                    personales:[{
                        observaciones:{type:String},
                        usu:{type: String},
                        f_usu:{type: Date},
                        acion_usu:{type: String}
                    }]
                }],
                consulta:[
                    {
                        procedencia:{type: String},
                        fecha_inicio:{type: Date},
                        fecha_alta:{type: Date},
                        procedencia:{type: String},
                        psicologo:{type:String},
                        motivo_consulta:{type:String},
                        sintomas:{type:String},
                        usu:{type: String},
                        f_usu:{type: Date},
                        acion_usu:{type: String},
                        diagnostico_psicologico:[
                            {
                                diagnostico:{type: String},
                                fechaDiagnostico:{type:Date},
                                observaciones_personales:{type: String},
                                usu:{type: String},
                                f_usu:{type: Date},
                                acion_usu:{type: String}
                            }
                        ],          
                        diagnostico_medico:[
                            {
                                patologiaMedica:{type:String} ,
                                fechaDiagnostico:{type:Date},
                                tratamiento:[{
                                    medicamento:{type:String} ,
                                    fechaInicio:{type:Date},
                                    fechaFin:{type:Date},
                                    posologia:{
                                        desayuno:{type: Number},
                                        comida:{type: Number},
                                        cena:{type: Number},
                                        otros:{type: Number}
                                    },
                                    observaciones:{type:String}
                                }],
                                usu:{type: String},
                                f_usu:{type: Date},
                                acion_usu:{type: String}                  
                            },
                        ],
                        
                        valoraciones: [
                            {   
                                cognitiva:[{
                                    fecha_valoracion:{type:Date},
                                    observaciones:{type:String},
                                    usu:{type: String},
                                    f_usu:{type: Date},
                                    acion_usu:{type: String} 
                                }],
                                emocional:[{
                                    fecha_valoracion:{type:Date},
                                    observaciones:{type:String},
                                    usu:{type: String},
                                    f_usu:{type: Date},
                                    acion_usu:{type: String}
                                }],
                                pruebasPsicodiagnostico:[{
                                    fecha_prueba:{type:Date},
                                    observaciones:{type:String},
                                    usu:{type: String},
                                    f_usu:{type: Date},
                                    acion_usu:{type: String}
                                }]

                            }
                    
                        ],
                        seguimiento: [
                            {   
                                fecha_cita:{type:Date},
                                hora_inicio_cita:{type:String},
                                hora_fin_cita:{type:String},
                                observaciones:{type:String},
                                fecha_prox_cita:{type:Date},
                                hora_prox_cita:{type:String},
                                conducta_a_seguir:{type:String},
                                usu:{type: String},
                                f_usu:{type: Date},
                                acion_usu:{type: String}  
                            }
                        ]
                    }   
                
                ]
            }
        ]
})

module.exports = mongoose.model('Formato', DatosSchema);
