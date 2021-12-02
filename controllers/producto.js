const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { ProductoSchema } = require('../models/Producto');

//Listar Productos
const getProductos = async ( req, res = response ) => {
    try {
        const productos = await ProductoSchema.findAll({order:['id']});
        if(productos){
            res.json({productos})
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

//Listar Productos True
const getProductosT = async ( req, res = response ) => {
    try {
        const productos = await ProductoSchema.findAll({where:{estado:true}});
        if(productos){
            res.json({productos})
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

//Listar Productos False
const getProductosF = async ( req, res = response ) => {
    try {
        const productos = await ProductoSchema.findAll({where:{estado:false}});
        if(productos){
            res.json({productos})
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

//Obtener Producto
const getProducto = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const productos = await ProductoSchema.findByPk(id);
        if(productos){
            res.json({productos});
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

//Crear Producto
const crearProducto = async ( req, res = response ) => {
    const { nombre, codigo } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let productos = await ProductoSchema.findOne({where: {nombre:nombre}});
        if(productos){
            return res.status(400).json({
                ok: false,
                msg: 'Producto ya Existe'
            });
        }
        let productosc = await ProductoSchema.findOne({where: {codigo:codigo}});
        if(productosc){
            return res.status(400).json({
                ok: false,
                msg: 'Producto ya Existe'
            });
        }
        productos = new ProductoSchema(req.body);
        await productos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Producto';
        auditoria.descripcion=`Ingreso de Producto ${productos.nombre}`;
        auditoria.idusuario=req.id;
        await productos.save();
        res.status(201).json({
            ok: true,
            productos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Producto
const editarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let productos = await ProductoSchema.findByPk(id);
        if(!productos){
            return res.status(404).json({
                msg: 'No existe producto'
            });
        }

        await productos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Producto';
        auditoria.descripcion=`Se edito Producto ${productos.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({productos})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Producto
const eliminarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const productos = await ProductoSchema.findByPk(id);
        if(!productos){
            return res.status(404).json({
                msg: 'No existe Producto'
            });
        }
        await productos.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Eliminacion Producto';
        auditoria.descripcion=`Se cambio de estado de Producto ${productos.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getProductos,
    getProductosT,
    getProductosF,
    getProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
}