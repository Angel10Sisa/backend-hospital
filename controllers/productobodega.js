const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');
const { ProductoSchema } = require('../models/Producto');
const { ProductobodegaSchema } = require('../models/Productobodega');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Producto Bodega
const getProductobodegaContar = async(req, res=response) =>{
    const productobodegas = await ProductobodegaSchema.count();
    if(productobodegas){
        res.json({productobodegas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar Producto BodegaID
const getProductobodegaidContar = async(req, res=response) =>{
    const { productobodega } = req.params;
    const productobodegas = await ProductobodegaSchema.count({where:{bodega:productobodega}});
    if(productobodegas){
        res.json({productobodegas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Producto Bodega Busqueda
const getProductobodegaB = async(req, res=response) =>{
    const { productobodega } = req.params;
    const productobodegas = await ProductobodegaSchema.findAll({where:{[Op.or]:[{codigoproducto:{[Op.like]:'%'+productobodega+'%'}},{nombreproducto:{[Op.like]:'%'+productobodega+'%'}}]}});
    if(productobodegas){
        res.json({productobodegas});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Producto BodegaID
const getProductobodegaid = async(req, res=response) =>{
    const { productobodega } = req.params;
    const productobodegas = await ProductobodegaSchema.findAll({where:{bodega:productobodega}});
    if(productobodegas){
        res.json({productobodegas});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}


// Listar Producto Bodegas
const getProductobodegas = async ( req, res = response) => {
    try {
        const productobodegas = await ProductobodegaSchema.findAll({order:['id']});
        if(productobodegas){
            res.json({productobodegas})
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}




// Obtener Producto Bodega
const getProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    try {
        const productobodegas = await ProductobodegaSchema.findByPk(id);
        if(productobodegas){
            res.json({productobodegas});
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Crear Producto Bodega
const crearProductobodega = async ( req, res = response) => {
    const { bodega, producto } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let productobodegas = new ProductobodegaSchema(req.body);
        let bodegas = await BodegaSchema.findByPk(bodega);
        if(bodegas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega esta inactivo'
            });
        }
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let productobodega = await ProductobodegaSchema.findAll({where:{bodega:bodega}});
        var produc = productobodega.map(elemento=>{
            return elemento.producto
        });
        if(produc.includes(producto)){
            return res.status(400).json({
                ok: false,
                msg: 'Producto ya existe en bodega'
            });
        }else{
            await productobodegas.save();
        }
        
        //Ingreso a la Auditoria
        auditoria.name=`Ingreso de Producto Bodega ${productobodegas.id}`;
        auditoria.descripcion=`Ingreso de Producto ${productobodegas.nombreproducto} a Bodega ${productobodegas.bodega}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productobodegas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Producto Bodega
const editarProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    try {
        let productobodegas = await ProductobodegaSchema.findByPk(id);
        if(!productobodegas){
            return res.status(404).json({
                msg: 'No existe producto en bodega'
            });
        }

        await productobodegas.update(req.body);
        res.status(201).json({
            ok: true,
            productobodegas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Editar Bodgea Producto x actualizacion de producto
const editarProductobodegaProducto = async ( req, res = response ) => {
    const { id } = req.params;
    try {

        let productobodegas = await ProductobodegaSchema.findAll({where:{producto:id}});
        if(!productobodegas){
            return res.status(404).json({
                msg: 'No existe Detalle Compra'
            });
        }
        await productobodegas.forEach(element => {
            element.update(req.body);
        });
        //await productobodegas.update(req.body);
        res.json({productobodegas})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Producto Bodega
const eliminarProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const productobodegas = await ProductobodegaSchema.findByPk(id);
        if(!productobodegas){
            return res.status(404).json({
                msg: 'No existe Producto Bodega'
            });
        }
        if(productobodegas.stock > 0){
            return res.status(404).json({
                msg: 'Existen Productos, primero debe vaciar la bodega de dicho producto'
            });
        }else{
            await productobodegas.destroy();
        }
        //Ingreso a la Auditoria
        auditoria.name=`Elimina Producto Bodega ${productobodegas.id}`;
        auditoria.descripcion=`Elimina Producto ${productobodegas.nombreproducto} de Bodega ${productobodegas.bodega}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productobodegas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    editarProductobodegaProducto,
    getProductobodegaidContar,
    getProductobodegaid,
    getProductobodegaContar,
    getProductobodegaB,
    getProductobodegas,
    getProductobodega,
    crearProductobodega,
    editarProductobodega,
    eliminarProductobodega
}