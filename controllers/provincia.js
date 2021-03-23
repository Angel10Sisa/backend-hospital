const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PaisSchema } = require('../models/Pais');
const { ProvinciaSchema } = require('../models/Provincia');

// Listar Provincias
const getProvincias = async(req, res= response) =>{
    const provincias = await ProvinciaSchema.findAll({include:[{model: PaisSchema, as:'Pais'}]});
    if(provincias){
        res.json({provincias});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener Provincia
const getProvincia = async(req, res= response) =>{
    const { id } = req.params;
    const provincias = await ProvinciaSchema.findByPk(id);
    if(provincias){
        res.json({provincias})
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Ingresar Provincia
const crearProvincia = async(req, res= response) =>{
    const { provincia } = req.body;
    const auditoria= new AuditoriaSchema();
    try {
        let provincias = await ProvinciaSchema.findOne({where: {provincia:provincia}});
        if(provincias){
            return res.status(400).json({
                ok: false,
                msg: 'Provincia ya Existe'
            });
        }
        provincias = new ProvinciaSchema(req.body);
        await provincias.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de provincia';
        auditoria.descripcion=`Ingreso de la provincia ${provincias.provincia}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            provincias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

//Editar Provincia
const editarProvincia = async(req, res= response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {

        let provincias = await ProvinciaSchema.findOne({where: {id:id}});
        if(!provincias){
            return res.status(404).json({
                msg: 'No existe un provincia'
            });
        }
        await provincias.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Provincia';
        auditoria.descripcion=`Se edito Provincia ${provincias.provincia}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({provincias})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar provincia
const eliminarProvincia = async(req, res= response) =>{
    const {id} = req.params;
    const auditoria = new AuditoriaSchema();
    const provincias = await ProvinciaSchema.findOne({where: {id:id}});
    if(!provincias){
        return res.status(404).json({
            msg: 'No existe pais'
        });
    }
    await provincias.destroy();
    //Ingreso a la Auditoria
    auditoria.name='Eliminar Provincia';
    auditoria.descripcion=`Se elimino Provincia ${provincias.provincia}`;
    auditoria.idusuario=req.id;
    await auditoria.save();

    res.status(201).json({
        ok: true,
        provincias
    });
}

module.exports={
    getProvincias,
    getProvincia,
    crearProvincia,
    editarProvincia,
    eliminarProvincia
}