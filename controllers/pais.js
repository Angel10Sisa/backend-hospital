const response = require('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PaisSchema }= require('../models/Pais');

//Listar Paises
const getPaises = async(req, res=response) =>{
    const paises= await PaisSchema.findAll();
    if(paises){
        res.json({paises});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener un Pais
const getPais = async(req, res=response) =>{
    const { id } = req.params;
    const paises = await PaisSchema.findOne({where:{id:id}});
    if(paises){
        res.json({paises});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Crear un Pais
const crearPais = async(req, res=response) =>{
    const { pais } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let pais1 = await PaisSchema.findOne({where:{pais:pais}});
        if(pais1){
            return res.status(400).json({
                ok: false,
                msg: 'Un Pais existe con ese nombre'
            });
        }
        pais1 = new PaisSchema(req.body);
        await pais1.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso nuevo Pais';
        auditoria.descripcion=`Se ingreso Pais ${pais1.pais}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            pais1
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });         
    }
}

//Editar un Pais
const editarPais = async(req, res=response) =>{
    const { id } = req.params;
    const { pais } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let paises = await PaisSchema.findOne({where:{pais:pais}});
        if(paises){
            return res.status(404).json({
                msg: 'Ese pais ya existe'
            });
        }
        
        paises = await PaisSchema.findOne({where:{id:id}});
        if(!paises){
            return res.status(404).json({
                msg: 'No existe un pais'
            });
        }
        
        await paises.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Pais';
        auditoria.descripcion=`Se edito Pais ${paises.pais}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            paises
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
    
}

//Eliminar un Pais
const eliminarPais = async (req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    const paises = await PaisSchema.findOne({where: {id:id}});
    if(!paises){
        return res.status(404).json({
            msg: 'No existe pais'
        });
    }
    await paises.destroy();
    //Ingreso a la Auditoria
    auditoria.name='Eliminar Pais';
    auditoria.descripcion=`Se elimino Pais ${paises.pais}`;
    auditoria.idusuario=req.id;
    await auditoria.save();

    res.status(201).json({
        ok: true,
        paises
    });
}

module.exports = {
    getPaises,
    getPais,
    crearPais,
    editarPais,
    eliminarPais
}